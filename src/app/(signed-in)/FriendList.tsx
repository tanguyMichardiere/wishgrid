"use client";

import Link from "next/link";
import UserPreviewCard from "../../components/UserPreviewCard";
import type { User } from "../../server/db/types/user";
import { trpc } from "../../utils/trpc/client";

type Props = {
  initialFriends: Array<User>;
};

export default function FriendList(props: Props): JSX.Element {
  const friends = trpc.friends.list.useQuery(undefined, { initialData: props.initialFriends });

  if (friends.data.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p>No friends</p>
        <Link className="link" href="/search">
          Search for your friends
        </Link>
      </div>
    );
  }

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
