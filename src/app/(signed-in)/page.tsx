import { createServerSideHelpers } from "../../utils/trpc/server";
import { FriendList } from "./page.client";

export const runtime = "edge";

export default async function HomePage(): Promise<JSX.Element> {
  const trpc = await createServerSideHelpers();

  const friends = await trpc.friends.list.fetch();

  return (
    <ul className="flex flex-col">
      <FriendList initialFriends={friends} />
    </ul>
  );
}
