import { createServerSideHelpers } from "../../utils/trpc/server";
import FriendList from "./FriendList";

export const runtime = "nodejs";

export default async function HomePage(): Promise<JSX.Element> {
  const trpc = await createServerSideHelpers();

  const friends = await trpc.friends.list.fetch();

  return (
    <ul className="flex flex-col">
      <FriendList initialFriends={friends} />
    </ul>
  );
}
