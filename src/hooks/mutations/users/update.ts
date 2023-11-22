import "client-only";
import type { Router } from "../../../server/router";
import { useOptimisticUpdates } from "../../../state/optimisticUpdates";
import { toast } from "../../../utils/toast";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";
import type { OptimisticRelatedProcedures } from "../relatedProcedures";

function useRelatedProcedures(): OptimisticRelatedProcedures<
  Router["users"]["update"],
  [Router["users"]["getCurrent"]]
> {
  const trpcUtils = trpc.useUtils();

  return {
    async cancel() {
      await trpcUtils.users.getCurrent.cancel();
    },
    getData() {
      return [trpcUtils.users.getCurrent.getData()];
    },
    setData({ name, image }) {
      trpcUtils.users.getCurrent.setData(undefined, (currentUser) =>
        currentUser !== undefined
          ? { ...currentUser, name, image: `data:image/png;base64,${image}` }
          : undefined,
      );
    },
    revertData(_variables, context) {
      if (context[0] !== undefined) {
        trpcUtils.users.getCurrent.setData(undefined, context[0]);
      }
    },
    async invalidate() {
      await trpcUtils.users.getCurrent.invalidate();
    },
  };
}

export function useUpdateUserMutation({ onSuccess }: { onSuccess?: () => void } = {}): ReturnType<
  typeof trpc.users.update.useMutation
> {
  const t = useClientTranslations("client.mutations.users.update");

  const relatedProcedures = useRelatedProcedures();

  const optimisticUpdates = useOptimisticUpdates();

  return trpc.users.update.useMutation({
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
