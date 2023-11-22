"use client";

import FriendPreviewCard from "../../../components/FriendPreviewCard";
import { Link } from "../../../navigation";
import type { Friend } from "../../../server/database/types/user";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";

type Props = {
  initialFriends: Array<Friend>;
};

export default function FriendList(props: Props): JSX.Element {
  const t = useClientTranslations("client.FriendList");

  const friends = trpc.friends.list.useQuery(undefined, { initialData: props.initialFriends });

  if (friends.data.length === 0) {
    return (
      <>
        <p className="text-center">{t("text")}</p>
        <Link className="link text-center" href="/user">
          {t("link")}
        </Link>
      </>
    );
  }

  return (
    <ul className="flex flex-col">
      {friends.data.map((friend) => (
        <li key={friend.id}>
          <Link href={`/friend/${friend.id}`}>
            <FriendPreviewCard friend={friend} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
