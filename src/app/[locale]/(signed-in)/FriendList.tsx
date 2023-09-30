"use client";

import Link from "next-intl/link";
import FriendPreviewCard from "../../../components/FriendPreviewCard";
import type { Friend } from "../../../server/db/types/user";
import { trpc } from "../../../utils/trpc/client";

type Props = {
  initialFriends: Array<Friend>;
};

export default function FriendList(props: Props): JSX.Element {
  const friends = trpc.friends.list.useQuery(undefined, { initialData: props.initialFriends });

  return (
    <>
      {friends.data.length > 0 && (
        <ul className="flex flex-col">
          {friends.data.map((friend) => (
            <li key={friend.id}>
              <Link href={`/friend/${friend.id}`}>
                <FriendPreviewCard friend={friend} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
