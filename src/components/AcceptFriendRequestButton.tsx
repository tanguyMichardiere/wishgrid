"use client";

import { useClientComponentsMessages } from "../context/clientComponentsMessages/hook";
import { trpc } from "../utils/trpc/client";
import MutationButton from "./MutationButton";

type Props = {
  userId: string;
};

export default function AcceptFriendRequestButton(props: Props): JSX.Element {
  const { AcceptFriendRequestButton: messages } = useClientComponentsMessages();

  const trpcContext = trpc.useContext();

  const acceptFriendRequest = trpc.friendRequests.accept.useMutation({
    async onMutate({ userId }) {
      await Promise.all([
        trpcContext.friends.status.cancel({ userId }),
        trpcContext.friendRequests.count.cancel(),
        trpcContext.friendRequests.list.cancel(),
        trpcContext.friendRequests.status.cancel({ userId }),
      ]);

      const previousFriendsGetStatus = trpcContext.friends.status.getData({ userId });
      const previousFriendRequestsCount = trpcContext.friendRequests.count.getData();
      const previousFriendRequestsList = trpcContext.friendRequests.list.getData();
      const previousFriendRequestsStatus = trpcContext.friendRequests.status.getData({ userId });

      // update friend status
      trpcContext.friends.status.setData({ userId }, true);
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
        previousFriendsGetStatus,
        previousFriendRequestsCount,
        previousFriendRequestsList,
        previousFriendRequestsStatus,
      };
    },
    onError(_error, { userId }, context) {
      if (context?.previousFriendsGetStatus !== undefined) {
        trpcContext.friends.status.setData({ userId }, context.previousFriendsGetStatus);
      }
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
        trpcContext.friends.status.invalidate({ userId }),
        trpcContext.friendRequests.count.invalidate(),
        trpcContext.friendRequests.list.invalidate(),
        trpcContext.friendRequests.status.invalidate({ userId }),
      ]);
    },
  });

  return (
    <MutationButton
      className="btn-primary"
      mutation={acceptFriendRequest}
      variables={{ userId: props.userId }}
    >
      {messages.text}
    </MutationButton>
  );
}
