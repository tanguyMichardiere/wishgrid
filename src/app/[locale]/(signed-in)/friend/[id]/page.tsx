import { redirect } from "next-intl/server";
import { notFound } from "next/navigation";
import Avatar from "../../../../../components/Avatar";
import type { User } from "../../../../../server/db/types/user";
import { createServerSideHelpers } from "../../../../../utils/trpc/server";
import { Username } from "../../user/[id]/Username";
import WishList from "./WishList";
import type { Params } from "./params";

export const runtime = "edge";

type Props = {
  params: Params;
};

export default async function FriendIdPage(props: Props): Promise<JSX.Element> {
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

  if (!friendsStatus) {
    redirect(`/user/${user.id}`);
  }

  const wishes = await trpc.wishes.list.fetch({ userId: props.params.id });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 self-center">
        <Avatar size="large" user={user} />
        <Username initialUser={user} userId={user.id} />
      </div>
      <ul className="flex flex-col">
        <WishList initialWishes={wishes} userId={props.params.id} />
      </ul>
    </div>
  );
}
