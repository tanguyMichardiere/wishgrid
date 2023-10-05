import "client-only";
import type { Router } from "../../../server/router";
import { useOptimisticUpdates } from "../../../state/optimisticUpdates";
import { toast } from "../../../utils/toast";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";
import type { OptimisticRelatedProcedures } from "../relatedProcedures";

function useRelatedProcedures(): OptimisticRelatedProcedures<
  Router["friendRequests"]["cancel"],
  [Router["friendRequests"]["status"]]
> {
  const trpcContext = trpc.useContext();

  return {
    async cancel({ userId }) {
      await trpcContext.friendRequests.status.cancel({ userId });
    },
    getData({ userId }) {
      return [trpcContext.friendRequests.status.getData({ userId })];
    },
    setData({ userId }) {
      trpcContext.friendRequests.status.setData({ userId }, { from: false, to: false });
    },
    revertData({ userId }, context) {
      if (context[0] !== undefined) {
        trpcContext.friendRequests.status.setData({ userId }, context[0]);
      }
    },
    async invalidate({ userId }) {
      await trpcContext.friendRequests.status.invalidate({ userId });
    },
  };
}

export function useCancelFriendRequestMutation({
  onSuccess,
}: { onSuccess?: () => void } = {}): ReturnType<typeof trpc.friendRequests.cancel.useMutation> {
  const t = useClientTranslations("client.mutations.friendRequests.cancel");

  const relatedProcedures = useRelatedProcedures();

  const optimisticUpdates = useOptimisticUpdates();

  return trpc.friendRequests.cancel.useMutation({
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
