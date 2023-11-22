import "client-only";
import type { Router } from "../../../server/router";
import { useOptimisticUpdates } from "../../../state/optimisticUpdates";
import { toast } from "../../../utils/toast";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";
import type { OptimisticRelatedProcedures } from "../relatedProcedures";

function useRelatedProcedures(): OptimisticRelatedProcedures<
  Router["friendRequests"]["create"],
  [Router["friendRequests"]["status"]]
> {
  const trpcUtils = trpc.useUtils();

  return {
    async cancel({ userId }) {
      await trpcUtils.friendRequests.status.cancel({ userId });
    },
    getData({ userId }) {
      return [trpcUtils.friendRequests.status.getData({ userId })];
    },
    setData({ userId }) {
      trpcUtils.friendRequests.status.setData({ userId }, (friendRequestStatus) =>
        friendRequestStatus !== undefined ? { ...friendRequestStatus, to: true } : undefined,
      );
    },
    revertData({ userId }, context) {
      if (context[0] !== undefined) {
        trpcUtils.friendRequests.status.setData({ userId }, context[0]);
      }
    },
    async invalidate({ userId }) {
      await trpcUtils.friendRequests.status.invalidate({ userId });
    },
  };
}

export function useCreateFriendRequestMutation({
  onSuccess,
}: { onSuccess?: () => void } = {}): ReturnType<typeof trpc.friendRequests.create.useMutation> {
  const t = useClientTranslations("client.mutations.friendRequests.create");

  const relatedProcedures = useRelatedProcedures();

  const optimisticUpdates = useOptimisticUpdates();

  return trpc.friendRequests.create.useMutation({
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
