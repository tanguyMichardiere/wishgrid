"use client";

import { trpc } from "../utils/trpc/client";
import MutationButton from "./MutationButton";

type Props = {
  userId: string;
};

export default function CancelFriendRequestButton(props: Props): JSX.Element {
  const trpcContext = trpc.useContext();

  const mutation = trpc.friendRequests.cancel.useMutation({
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
    <MutationButton mutation={mutation} variables={{ userId: props.userId }}>
      Cancel Friend Request
    </MutationButton>
  );
}
