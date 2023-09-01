import { createServerSideHelpers } from "../../../utils/trpc/server";
import { FriendRequestList } from "./page.client";

export const runtime = "edge";

export default async function FriendRequestsPage(): Promise<JSX.Element> {
  const trpc = await createServerSideHelpers();

  const friendRequests = await trpc.friendRequests.list.fetch();

  return (
    <ul className="flex flex-col">
      <FriendRequestList initialFriendRequests={friendRequests} />
    </ul>
  );
}
