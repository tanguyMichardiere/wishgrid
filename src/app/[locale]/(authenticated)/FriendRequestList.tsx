"use client";

import type { JSX } from "react";
import FriendRequestsCard from "../../../components/FriendRequestCard";
import type { User } from "../../../server/database/types/user";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";

type Props = {
  initialFriendRequests: Array<User>;
};

export default function FriendRequestList(props: Props): JSX.Element {
  const t = useClientTranslations("client.FriendRequestList");

  const friendRequests = trpc.friendRequests.list.useQuery(undefined, {
    initialData: props.initialFriendRequests,
  });

  return (
    <>
      {friendRequests.data.length > 0 && (
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <h3 className="self-center">{t("friendRequests")}</h3>
            <ul className="flex flex-col">
              {friendRequests.data.map((user) => (
                <li key={user.id}>
                  <FriendRequestsCard user={user} />
                </li>
              ))}
            </ul>
          </div>
          <div className="divider" />
        </div>
      )}
    </>
  );
}
