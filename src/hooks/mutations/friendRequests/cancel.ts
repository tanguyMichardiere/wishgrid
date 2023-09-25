import "client-only";
import { trpc } from "../../../utils/trpc/client";

export function useCancelFriendRequestMutation(): ReturnType<
  typeof trpc.friendRequests.cancel.useMutation
> {
  const trpcContext = trpc.useContext();

  return trpc.friendRequests.cancel.useMutation({
    async onMutate({ userId }) {
      await trpcContext.friendRequests.status.cancel({ userId });

      const previousFriendRequestsStatus = trpcContext.friendRequests.status.getData({ userId });

      // update friend request status
      trpcContext.friendRequests.status.setData({ userId }, { from: false, to: false });

      return { previousFriendRequestsStatus };
    },
    onError(_error, { userId }, context) {
      if (context?.previousFriendRequestsStatus !== undefined) {
        trpcContext.friendRequests.status.setData({ userId }, context.previousFriendRequestsStatus);
      }
    },
    async onSettled(_data, _error, { userId }) {
      await trpcContext.friendRequests.status.invalidate({ userId });
    },
  });
}
