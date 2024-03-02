import "client-only";
import type { Router } from "../../../server/router";
import { toast } from "../../../utils/toast";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";
import { useOptimisticUpdates } from "../optimisticUpdates";
import type { OptimisticRelatedProcedures } from "../relatedProcedures";

function useRelatedProcedures(): OptimisticRelatedProcedures<
  Router["friendRequests"]["accept"],
  [
    Router["friends"]["status"],
    Router["friendRequests"]["list"],
    Router["friendRequests"]["status"],
  ]
> {
  const trpcUtils = trpc.useUtils();

  return {
    async cancel({ userId }) {
      await Promise.all([
        trpcUtils.friends.status.cancel({ userId }),
        trpcUtils.friendRequests.list.cancel(),
        trpcUtils.friendRequests.status.cancel({ userId }),
      ]);
    },
    getData({ userId }) {
      return [
        trpcUtils.friends.status.getData({ userId }),
        trpcUtils.friendRequests.list.getData(),
        trpcUtils.friendRequests.status.getData({ userId }),
      ];
    },
    setData({ userId }) {
      trpcUtils.friends.status.setData({ userId }, true);
      trpcUtils.friendRequests.list.setData(undefined, (friendRequests) =>
        friendRequests !== undefined
          ? friendRequests.filter((user) => user.id !== userId)
          : undefined,
      );
      trpcUtils.friendRequests.status.setData({ userId }, { from: false, to: false });
    },
    revertData({ userId }, context) {
      if (context[0] !== undefined) {
        trpcUtils.friends.status.setData({ userId }, context[0]);
      }
      if (context[1] !== undefined) {
        trpcUtils.friendRequests.list.setData(undefined, context[1]);
      }
      if (context[2] !== undefined) {
        trpcUtils.friendRequests.status.setData({ userId }, context[2]);
      }
    },
    async invalidate({ userId }) {
      await Promise.all([
        trpcUtils.friends.list.invalidate(),
        trpcUtils.friends.status.invalidate({ userId }),
        trpcUtils.friendRequests.list.invalidate(),
        trpcUtils.friendRequests.status.invalidate({ userId }),
      ]);
    },
  };
}

export function useAcceptFriendRequestMutation({
  onSuccess,
}: { onSuccess?: () => void } = {}): ReturnType<typeof trpc.friendRequests.accept.useMutation> {
  const t = useClientTranslations("client.mutations.friendRequests.accept");

  const relatedProcedures = useRelatedProcedures();

  const optimisticUpdates = useOptimisticUpdates();

  return trpc.friendRequests.accept.useMutation({
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
