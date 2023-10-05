import "client-only";
import type { Router } from "../../../server/router";
import { useOptimisticUpdates } from "../../../state/optimisticUpdates";
import { toast } from "../../../utils/toast";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";
import type { OptimisticRelatedProcedures } from "../relatedProcedures";

function useRelatedProcedures(): OptimisticRelatedProcedures<
  Router["friendRequests"]["accept"],
  [
    Router["friends"]["status"],
    Router["friendRequests"]["list"],
    Router["friendRequests"]["status"],
  ]
> {
  const trpcContext = trpc.useContext();

  return {
    async cancel({ userId }) {
      await Promise.all([
        trpcContext.friends.status.cancel({ userId }),
        trpcContext.friendRequests.list.cancel(),
        trpcContext.friendRequests.status.cancel({ userId }),
      ]);
    },
    getData({ userId }) {
      return [
        trpcContext.friends.status.getData({ userId }),
        trpcContext.friendRequests.list.getData(),
        trpcContext.friendRequests.status.getData({ userId }),
      ];
    },
    setData({ userId }) {
      trpcContext.friends.status.setData({ userId }, true);
      trpcContext.friendRequests.list.setData(undefined, (friendRequests) =>
        friendRequests !== undefined
          ? friendRequests.filter((user) => user.id !== userId)
          : undefined,
      );
      trpcContext.friendRequests.status.setData({ userId }, { from: false, to: false });
    },
    revertData({ userId }, context) {
      if (context[0] !== undefined) {
        trpcContext.friends.status.setData({ userId }, context[0]);
      }
      if (context[1] !== undefined) {
        trpcContext.friendRequests.list.setData(undefined, context[1]);
      }
      if (context[2] !== undefined) {
        trpcContext.friendRequests.status.setData({ userId }, context[2]);
      }
    },
    async invalidate({ userId }) {
      await Promise.all([
        trpcContext.friends.status.invalidate({ userId }),
        trpcContext.friendRequests.list.invalidate(),
        trpcContext.friendRequests.status.invalidate({ userId }),
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
