"use client";

import AcceptFriendRequestButton from "../../../../../components/AcceptFriendRequestButton";
import CancelFriendRequestButton from "../../../../../components/CancelFriendRequestButton";
import DeclineFriendRequestButton from "../../../../../components/DeclineFriendRequestButton";
import RequestFriendButton from "../../../../../components/RequestFriendButton";
import { trpc } from "../../../../../utils/trpc/client";

type Props = {
  userId: string;
  initialFriendRequestsStatus: { from: boolean; to: boolean };
};

export default function Buttons(props: Props): JSX.Element {
  const friendRequestsStatus = trpc.friendRequests.status.useQuery(
    { userId: props.userId },
    { initialData: props.initialFriendRequestsStatus },
  );

  return (
    <>
      {friendRequestsStatus.data.from ? (
        <div className="flex gap-4">
          <DeclineFriendRequestButton userId={props.userId} />
          <AcceptFriendRequestButton userId={props.userId} />
        </div>
      ) : friendRequestsStatus.data.to ? (
        <CancelFriendRequestButton userId={props.userId} />
      ) : (
        <RequestFriendButton userId={props.userId} />
      )}
    </>
  );
}
