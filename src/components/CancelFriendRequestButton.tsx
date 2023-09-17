"use client";

import { useClientComponentsMessages } from "../context/clientComponentsMessages/hook";
import { trpc } from "../utils/trpc/client";
import MutationButton from "./MutationButton";

type Props = {
  userId: string;
};

export default function CancelFriendRequestButton(props: Props): JSX.Element {
  const { CancelFriendRequestButton: messages } = useClientComponentsMessages();

  const trpcContext = trpc.useContext();

  const cancelFriendRequest = trpc.friendRequests.cancel.useMutation({
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

  return (
    <MutationButton mutation={cancelFriendRequest} variables={{ userId: props.userId }}>
      {messages.text}
    </MutationButton>
  );
}
