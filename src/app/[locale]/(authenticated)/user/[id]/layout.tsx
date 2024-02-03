import type { JSX, ReactNode } from "react";
import { redirect } from "../../../../../navigation";
import { getFriendsStatus } from "../../../../../utils/serverQueries/friends/status";
import { getCurrentUser } from "../../../../../utils/serverQueries/users/getCurrent";
import type { Params } from "./params";

type Props = {
  params: Params;
  children: ReactNode;
};

export default async function UserIdLayout(props: Props): Promise<JSX.Element> {
  const currentUser = await getCurrentUser();
  if (currentUser.id === props.params.id) {
    redirect("/user");
  }

  const friendsStatus = await getFriendsStatus(props.params.id);
  if (friendsStatus) {
    redirect(`/friend/${props.params.id}`);
  }

  return <>{props.children}</>;
}
