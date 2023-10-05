import "client-only";
import type { Router, RouterOutputs } from "../../../server/router";
import { useOptimisticUpdates } from "../../../state/optimisticUpdates";
import { toast } from "../../../utils/toast";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";
import type { OptimisticRelatedProcedures } from "../relatedProcedures";

function useRelatedProcedures(
  userId: string,
): OptimisticRelatedProcedures<
  Router["wishes"]["unreserve"],
  { wishList: RouterOutputs["wishes"]["list"] }
> {
  const trpcContext = trpc.useContext();

  return {
    async cancel() {
      await trpcContext.wishes.list.cancel({ userId });
    },
    getData() {
      return {
        wishList: trpcContext.wishes.list.getData({ userId }),
      };
    },
    setData({ id }) {
      trpcContext.wishes.list.setData(
        { userId },
        (wishes) => wishes?.map((wish) => (wish.id === id ? { ...wish, reservedBy: null } : wish)),
      );
    },
    revertData(_variables, context) {
      if (context?.wishList !== undefined) {
        trpcContext.wishes.list.setData({ userId }, context.wishList);
      }
    },
    async invalidate() {
      await trpcContext.wishes.list.invalidate({ userId });
    },
  };
}

export function useUnreserveWishMutation(
  userId: string,
  { onSuccess }: { onSuccess?: () => void } = {},
): ReturnType<typeof trpc.wishes.unreserve.useMutation> {
  const t = useClientTranslations("client.mutations.wishes.unreserve");

  const relatedProcedures = useRelatedProcedures(userId);

  const optimisticUpdates = useOptimisticUpdates();

  return trpc.wishes.unreserve.useMutation({
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
      relatedProcedures.revertData(variables, context);
    },
    async onSettled(_data, _error, variables) {
      await relatedProcedures.invalidate(variables);
    },
  });
}
