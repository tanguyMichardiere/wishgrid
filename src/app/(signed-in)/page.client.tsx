"use client";

import Link from "next/link";
import UserPreviewCard from "../../components/UserPreviewCard";
import type { User } from "../../schemas/user";
import { trpc } from "../../utils/trpc/client";

type FriendListProps = {
  initialFriends: Array<User>;
};

export function FriendList(props: FriendListProps): JSX.Element {
  const friends = trpc.friends.list.useQuery(undefined, { initialData: props.initialFriends });

  return (
    <>
      {friends.data.map((user) => (
        <li key={user.id}>
          <Link href={`/friend/${user.id}`}>
            <UserPreviewCard user={user} />
          </Link>
        </li>
      ))}
    </>
  );
}
