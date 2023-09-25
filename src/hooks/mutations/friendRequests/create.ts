import "client-only";
import { trpc } from "../../../utils/trpc/client";

export function useCreateFriendRequestMutation(): ReturnType<
  typeof trpc.friendRequests.create.useMutation
> {
  const trpcContext = trpc.useContext();

  return trpc.friendRequests.create.useMutation({
    async onMutate({ userId }) {
      await trpcContext.friendRequests.status.cancel({ userId });

      const previousFriendRequestsStatus = trpcContext.friendRequests.status.getData();

      // update friend request status
      trpcContext.friendRequests.status.setData({ userId }, (friendRequestStatus) =>
        friendRequestStatus !== undefined ? { ...friendRequestStatus, to: true } : undefined,
      );

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
