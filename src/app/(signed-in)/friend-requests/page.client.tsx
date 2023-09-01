"use client";

import FriendRequestsCard from "../../../components/FriendRequestCard";
import type { User } from "../../../schemas/user";
import { trpc } from "../../../utils/trpc/client";

type FriendRequestProps = {
  initialFriendRequests: Array<User>;
};

export function FriendRequestList(props: FriendRequestProps): JSX.Element {
  const friendRequests = trpc.friendRequests.list.useQuery(undefined, {
    initialData: props.initialFriendRequests,
  });

  return (
    <>
      {friendRequests.data.map((user) => (
        <li key={user.id}>
          <FriendRequestsCard user={user} />
        </li>
      ))}
    </>
  );
}
