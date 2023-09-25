import "client-only";
import { trpc } from "../../../utils/trpc/client";

export function useDeclineFriendRequestMutation(): ReturnType<
  typeof trpc.friendRequests.decline.useMutation
> {
  const trpcContext = trpc.useContext();

  return trpc.friendRequests.decline.useMutation({
    async onMutate({ userId }) {
      await Promise.all([
        trpcContext.friendRequests.count.cancel(),
        trpcContext.friendRequests.list.cancel(),
        trpcContext.friendRequests.status.cancel({ userId }),
      ]);

      const previousFriendRequestsCount = trpcContext.friendRequests.count.getData();
      const previousFriendRequestsList = trpcContext.friendRequests.list.getData();
      const previousFriendRequestsStatus = trpcContext.friendRequests.status.getData({ userId });

      // update friend requests count
      trpcContext.friendRequests.count.setData(undefined, (count) =>
        count !== undefined ? count - 1 : undefined,
      );
      // update friend requests list
      trpcContext.friendRequests.list.setData(undefined, (friendRequests) =>
        friendRequests !== undefined
          ? friendRequests.filter((user) => user.id !== userId)
          : undefined,
      );
      // update friend request status
      trpcContext.friendRequests.status.setData({ userId }, { from: false, to: false });

      return {
        previousFriendRequestsCount,
        previousFriendRequestsList,
        previousFriendRequestsStatus,
      };
    },
    onError(_error, { userId }, context) {
      if (context?.previousFriendRequestsCount !== undefined) {
        trpcContext.friendRequests.count.setData(undefined, context.previousFriendRequestsCount);
      }
      if (context?.previousFriendRequestsList !== undefined) {
        trpcContext.friendRequests.list.setData(undefined, context.previousFriendRequestsList);
      }
      if (context?.previousFriendRequestsStatus !== undefined) {
        trpcContext.friendRequests.status.setData({ userId }, context.previousFriendRequestsStatus);
      }
    },
    async onSettled(_data, _error, { userId }) {
      await Promise.all([
        trpcContext.friendRequests.count.invalidate(),
        trpcContext.friendRequests.list.invalidate(),
        trpcContext.friendRequests.status.invalidate({ userId }),
      ]);
    },
  });
}
