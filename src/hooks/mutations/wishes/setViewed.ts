import "client-only";
import type { Router } from "../../../server/router";
import { useOptimisticUpdates } from "../../../state/optimisticUpdates";
import { toast } from "../../../utils/toast";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";
import type { OptimisticRelatedProcedures } from "../relatedProcedures";

function useRelatedProcedures(
  userId: string,
): OptimisticRelatedProcedures<
  Router["wishes"]["setViewed"],
  [Router["friends"]["list"], Router["wishes"]["list"]]
> {
  const trpcContext = trpc.useContext();

  return {
    async cancel() {
      await Promise.all([
        trpcContext.friends.list.cancel(),
        trpcContext.wishes.list.cancel({ userId }),
      ]);
    },
    getData() {
      return [trpcContext.friends.list.getData(), trpcContext.wishes.list.getData({ userId })];
    },
    setData({ id }) {
      trpcContext.friends.list.setData(
        undefined,
        (friends) =>
          friends?.map((friend) =>
            friend.id === userId ? { ...friend, newWishCount: friend.newWishCount - 1 } : friend,
          ),
      );
      trpcContext.wishes.list.setData(
        { userId },
        (wishes) => wishes?.map((wish) => (wish.id === id ? { ...wish, viewed: true } : wish)),
      );
    },
    revertData(_variables, context) {
      if (context[0] !== undefined) {
        trpcContext.friends.list.setData(undefined, context[0]);
      }
      if (context[1] !== undefined) {
        trpcContext.wishes.list.setData({ userId }, context[1]);
      }
    },
    async invalidate() {
      await Promise.all([
        trpcContext.friends.list.invalidate(),
        trpcContext.wishes.list.invalidate({ userId }),
      ]);
    },
  };
}

export function useSetWishViewedMutation(
  userId: string,
  { onSuccess }: { onSuccess?: () => void } = {},
): ReturnType<typeof trpc.wishes.setViewed.useMutation> {
  const t = useClientTranslations("client.mutations.wishes.setViewed");

  const relatedProcedures = useRelatedProcedures(userId);

  const optimisticUpdates = useOptimisticUpdates();

  return trpc.wishes.setViewed.useMutation({
    async onMutate(variables) {
      if (optimisticUpdates) {
        await relatedProcedures.cancel(variables);
        const context = relatedProcedures.getData(variables);
        relatedProcedures.setData(variables);
        return context;
      }
      return undefined;
    },
    onSuccess(_data, variables) {
      if (!optimisticUpdates) {
        relatedProcedures.setData(variables);
      }
      onSuccess?.();
    },
    onError(_error, variables, context) {
      toast.error(t("errorText"));
      if (context !== undefined) {
        relatedProcedures.revertData(variables, context);
      }
    },
    async onSettled(_data, _error, variables) {
      await relatedProcedures.invalidate(variables);
    },
  });
}
