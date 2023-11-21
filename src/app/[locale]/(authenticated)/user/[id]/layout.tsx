import type { ReactNode } from "react";
import { redirect } from "../../../../../navigation";
import { getFriendsStatus } from "../../../../../utils/serverQueries/friends/status";
import { getCurrentUser } from "../../../../../utils/serverQueries/users/getCurrent";
import type { Params } from "./params";

type Props = {
  params: Params;
  children: ReactNode;
};

export default async function UserIdLayout(props: Props): Promise<JSX.Element> {
  const friendsStatusPromise = getFriendsStatus(props.params.id);

  const currentUser = await getCurrentUser();

  if (currentUser.id === props.params.id) {
    redirect("/user");
  }

  const friendsStatus = await friendsStatusPromise;

  if (friendsStatus) {
    redirect(`/friend/${props.params.id}`);
  }

  return <>{props.children}</>;
}
