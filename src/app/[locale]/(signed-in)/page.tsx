import { getFriendsList } from "../../../utils/serverQueries/friends/list";
import FriendList from "./FriendList";

export default async function HomePage(): Promise<JSX.Element> {
  const friends = await getFriendsList();

  return (
    <ul className="flex flex-col">
      <FriendList initialFriends={friends} />
    </ul>
  );
}
