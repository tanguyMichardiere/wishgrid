import "client-only";
import { trpc } from "../../../utils/trpc/client";

export function useDeclineFriendRequestMutation(): ReturnType<
  typeof trpc.friendRequests.decline.useMutation
> {
  const trpcContext = trpc.useContext();

  return trpc.friendRequests.decline.useMutation({
    async onMutate({ userId }) {
      await Promise.all([
        trpcContext.friendRequests.list.cancel(),
        trpcContext.friendRequests.status.cancel({ userId }),
      ]);

      const previousFriendRequestsList = trpcContext.friendRequests.list.getData();
      const previousFriendRequestsStatus = trpcContext.friendRequests.status.getData({ userId });

      // update friend requests list
      trpcContext.friendRequests.list.setData(undefined, (friendRequests) =>
        friendRequests !== undefined
          ? friendRequests.filter((user) => user.id !== userId)
          : undefined,
      );
      // update friend request status
      trpcContext.friendRequests.status.setData({ userId }, { from: false, to: false });

      return {
        previousFriendRequestsList,
        previousFriendRequestsStatus,
      };
    },
    onError(_error, { userId }, context) {
      if (context?.previousFriendRequestsList !== undefined) {
        trpcContext.friendRequests.list.setData(undefined, context.previousFriendRequestsList);
      }
      if (context?.previousFriendRequestsStatus !== undefined) {
        trpcContext.friendRequests.status.setData({ userId }, context.previousFriendRequestsStatus);
      }
    },
    async onSettled(_data, _error, { userId }) {
      await Promise.all([
        trpcContext.friendRequests.list.invalidate(),
        trpcContext.friendRequests.status.invalidate({ userId }),
      ]);
    },
  });
}
