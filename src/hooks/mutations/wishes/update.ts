import "client-only";
import type { Router } from "../../../server/router";
import { useOptimisticUpdates } from "../../../state/optimisticUpdates";
import { toast } from "../../../utils/toast";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";
import type { OptimisticRelatedProcedures } from "../relatedProcedures";

function useRelatedProcedures(): OptimisticRelatedProcedures<
  Router["wishes"]["update"],
  [Router["wishes"]["listOwn"]]
> {
  const trpcContext = trpc.useContext();

  return {
    async cancel() {
      await trpcContext.wishes.listOwn.cancel();
    },
    getData() {
      return [trpcContext.wishes.listOwn.getData()];
    },
    setData({ id, description, link }) {
      trpcContext.wishes.listOwn.setData(
        undefined,
        (wishes) => wishes?.map((wish) => (wish.id === id ? { ...wish, description, link } : wish)),
      );
    },
    revertData(_variables, context) {
      if (context[0] !== undefined) {
        trpcContext.wishes.listOwn.setData(undefined, context[0]);
      }
    },
    async invalidate() {
      await trpcContext.wishes.listOwn.invalidate();
    },
  };
}

export function useUpdateWishMutation({ onSuccess }: { onSuccess?: () => void } = {}): ReturnType<
  typeof trpc.wishes.update.useMutation
> {
  const t = useClientTranslations("client.mutations.wishes.update");

  const relatedProcedures = useRelatedProcedures();

  const optimisticUpdates = useOptimisticUpdates();

  return trpc.wishes.update.useMutation({
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
