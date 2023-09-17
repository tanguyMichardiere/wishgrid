"use client";

import { useTranslations } from "next-intl";
import FriendRequestsCard from "../../../../components/FriendRequestCard";
import type { User } from "../../../../server/db/types/user";
import { trpc } from "../../../../utils/trpc/client";

type Props = {
  initialFriendRequests: Array<User>;
};

export default function FriendRequestList(props: Props): JSX.Element {
  const t = useTranslations("clientComponents.FriendRequestList");

  const friendRequests = trpc.friendRequests.list.useQuery(undefined, {
    initialData: props.initialFriendRequests,
  });

  if (friendRequests.data.length === 0) {
    return <div className="text-center">{t("noFriendRequests")}</div>;
  }

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
