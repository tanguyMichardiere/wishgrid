import { notFound, redirect } from "next/navigation";
import Avatar from "../../../../components/Avatar";
import { createServerSideHelpers } from "../../../../utils/trpc/server";
import { Buttons } from "./page.client";

export const runtime = "edge";

type Props = {
  params: Params;
};

export default async function UserIdPage(props: Props): Promise<JSX.Element> {
  const trpc = await createServerSideHelpers();

  const [currentUser, user] = await Promise.allSettled([
    trpc.users.getCurrent.fetch(),
    trpc.users.get.fetch({ userId: props.params.id }),
  ]);

  if (currentUser.status === "rejected") {
    redirect("/sign-in/");
  }

  if (user.status === "rejected") {
    notFound();
  }

  if (currentUser.value.id === user.value.id) {
    redirect("/user");
  }

  const friendsStatus = await trpc.friends.status.fetch({ userId: user.value.id });

  if (friendsStatus) {
    redirect(`/friend/${user.value.id}`);
  }

  const friendRequestsStatus = await trpc.friendRequests.status.fetch({ userId: user.value.id });

  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar size="large" user={user.value} />
      <h3 className="text-lg">{user.value.username}</h3>
      <Buttons initialFriendRequestsStatus={friendRequestsStatus} userId={user.value.id} />
    </div>
  );
}
