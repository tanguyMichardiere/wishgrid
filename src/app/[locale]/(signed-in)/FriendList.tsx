"use client";

import Link from "next-intl/link";
import FriendPreviewCard from "../../../components/FriendPreviewCard";
import type { Friend } from "../../../server/db/types/user";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";

type Props = {
  initialFriends: Array<Friend>;
};

export default function FriendList(props: Props): JSX.Element {
  const t = useClientTranslations("clientComponents.FriendList");

  const friends = trpc.friends.list.useQuery(undefined, { initialData: props.initialFriends });

  if (friends.data.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p>{t("noFriends")}</p>
        <Link className="link" href="/search">
          {t("search")}
        </Link>
      </div>
    );
  }

  return (
    <>
      {friends.data.map((friend) => (
        <li key={friend.id}>
          <Link href={`/friend/${friend.id}`}>
            <FriendPreviewCard friend={friend} />
          </Link>
        </li>
      ))}
    </>
  );
}
