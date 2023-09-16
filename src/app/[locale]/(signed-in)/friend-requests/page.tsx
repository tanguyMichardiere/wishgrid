import { createServerSideHelpers } from "../../../../utils/trpc/server";
import FriendRequestList from "./FriendRequestList";

export const runtime = "nodejs";

export default async function FriendRequestsPage(): Promise<JSX.Element> {
  const trpc = await createServerSideHelpers();

  const friendRequests = await trpc.friendRequests.list.fetch();

  return (
    <ul className="flex flex-col">
      <FriendRequestList initialFriendRequests={friendRequests} />
    </ul>
  );
}
