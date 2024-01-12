import "client-only";
import type { Router } from "../../../server/router";
import { useOptimisticUpdates } from "../../../state/optimisticUpdates";
import { toast } from "../../../utils/toast";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";
import type { OptimisticRelatedProcedures } from "../relatedProcedures";

function useRelatedProcedures(): OptimisticRelatedProcedures<
  Router["wishes"]["delete"],
  [Router["wishes"]["listOwn"]]
> {
  const trpcUtils = trpc.useUtils();

  return {
    async cancel() {
      await trpcUtils.wishes.listOwn.cancel();
    },
    getData() {
      return [trpcUtils.wishes.listOwn.getData()];
    },
    setData({ id }) {
      trpcUtils.wishes.listOwn.setData(undefined, (wishes) =>
        wishes?.filter((wish) => wish.id !== id),
      );
    },
    revertData(_variables, context) {
      if (context[0] !== undefined) {
        trpcUtils.wishes.listOwn.setData(undefined, context[0]);
      }
    },
    async invalidate() {
      await trpcUtils.wishes.listOwn.invalidate();
    },
  };
}

export function useDeleteWishMutation({ onSuccess }: { onSuccess?: () => void } = {}): ReturnType<
  typeof trpc.wishes.delete.useMutation
> {
  const t = useClientTranslations("client.mutations.wishes.delete");

  const relatedProcedures = useRelatedProcedures();

  const optimisticUpdates = useOptimisticUpdates();

  return trpc.wishes.delete.useMutation({
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
