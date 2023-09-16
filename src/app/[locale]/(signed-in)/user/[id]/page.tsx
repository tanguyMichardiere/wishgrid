import { notFound, redirect } from "next/navigation";
import Avatar from "../../../../../components/Avatar";
import type { User } from "../../../../../server/db/types/user";
import { createServerSideHelpers } from "../../../../../utils/trpc/server";
import Buttons from "./Buttons";
import { Username } from "./Username";
import type { Params } from "./params";

export const runtime = "nodejs";

type Props = {
  params: Params;
};

export default async function UserIdPage(props: Props): Promise<JSX.Element> {
  const trpc = await createServerSideHelpers();

  let currentUser: User, user: User;
  try {
    [currentUser, user] = await Promise.all([
      trpc.users.getCurrent.fetch(),
      trpc.users.get.fetch({ userId: props.params.id }),
    ]);
  } catch {
    notFound();
  }

  if (currentUser.id === user.id) {
    redirect("/user");
  }

  const friendsStatus = await trpc.friends.status.fetch({ userId: user.id });

  if (friendsStatus) {
    redirect(`/friend/${user.id}`);
  }

  const friendRequestsStatus = await trpc.friendRequests.status.fetch({ userId: user.id });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar initialUser={user} size="large" />
        <Username initialUser={user} userId={user.id} />
      </div>
      <Buttons initialFriendRequestsStatus={friendRequestsStatus} userId={user.id} />
    </div>
  );
}
