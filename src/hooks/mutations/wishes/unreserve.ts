import "client-only";
import type { Router } from "../../../server/router";
import { useOptimisticUpdates } from "../../../state/optimisticUpdates";
import { toast } from "../../../utils/toast";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";
import type { OptimisticRelatedProcedures } from "../relatedProcedures";

function useRelatedProcedures(
  userId: string,
): OptimisticRelatedProcedures<Router["wishes"]["unreserve"], [Router["wishes"]["list"]]> {
  const trpcUtils = trpc.useUtils();

  return {
    async cancel() {
      await trpcUtils.wishes.list.cancel({ userId });
    },
    getData() {
      return [trpcUtils.wishes.list.getData({ userId })];
    },
    setData({ id }) {
      trpcUtils.wishes.list.setData({ userId }, (wishes) =>
        wishes?.map((wish) => (wish.id === id ? { ...wish, reservedBy: null } : wish)),
      );
    },
    revertData(_variables, context) {
      if (context[0] !== undefined) {
        trpcUtils.wishes.list.setData({ userId }, context[0]);
      }
    },
    async invalidate() {
      await trpcUtils.wishes.list.invalidate({ userId });
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
      if (context !== undefined) {
        relatedProcedures.revertData(variables, context);
      }
    },
    async onSettled(_data, _error, variables) {
      await relatedProcedures.invalidate(variables);
    },
  });
}
