import "client-only";
import type { Router, RouterOutputs } from "../../../server/router";
import { useOptimisticUpdates } from "../../../state/optimisticUpdates";
import { toast } from "../../../utils/toast";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";
import type { OptimisticRelatedProcedures } from "../relatedProcedures";

function useRelatedProcedures(): OptimisticRelatedProcedures<
  Router["friendRequests"]["decline"],
  {
    friendRequestsList: RouterOutputs["friendRequests"]["list"];
    friendRequestsStatus: RouterOutputs["friendRequests"]["status"];
  }
> {
  const trpcContext = trpc.useContext();

  return {
    async cancel({ userId }) {
      await Promise.all([
        trpcContext.friendRequests.list.cancel(),
        trpcContext.friendRequests.status.cancel({ userId }),
      ]);
    },
    getData({ userId }) {
      return {
        friendRequestsList: trpcContext.friendRequests.list.getData(),
        friendRequestsStatus: trpcContext.friendRequests.status.getData({ userId }),
      };
    },
    setData({ userId }) {
      trpcContext.friendRequests.list.setData(undefined, (friendRequests) =>
        friendRequests !== undefined
          ? friendRequests.filter((user) => user.id !== userId)
          : undefined,
      );
      trpcContext.friendRequests.status.setData({ userId }, { from: false, to: false });
    },
    revertData({ userId }, context) {
      if (context?.friendRequestsList !== undefined) {
        trpcContext.friendRequests.list.setData(undefined, context.friendRequestsList);
      }
      if (context?.friendRequestsStatus !== undefined) {
        trpcContext.friendRequests.status.setData({ userId }, context.friendRequestsStatus);
      }
    },
    async invalidate({ userId }) {
      await Promise.all([
        trpcContext.friendRequests.list.invalidate(),
        trpcContext.friendRequests.status.invalidate({ userId }),
      ]);
    },
  };
}

export function useDeclineFriendRequestMutation({
  onSuccess,
}: { onSuccess?: () => void } = {}): ReturnType<typeof trpc.friendRequests.decline.useMutation> {
  const t = useClientTranslations("client.mutations.friendRequests.decline");

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
      relatedProcedures.revertData(variables, context);
    },
    async onSettled(_data, _error, variables) {
      await relatedProcedures.invalidate(variables);
    },
  });
}
