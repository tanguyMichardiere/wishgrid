import SearchUserButton from "../../../components/SearchUserButton";
import { getFriendRequestsList } from "../../../utils/serverQueries/friendRequests/list";
import { getFriendsList } from "../../../utils/serverQueries/friends/list";
import FriendList from "./FriendList";
import FriendRequestList from "./FriendRequestList";

export default async function HomePage(): Promise<JSX.Element> {
  const friends = await getFriendsList();

  const friendRequests = await getFriendRequestsList();

  return (
    <>
      <FriendRequestList initialFriendRequests={friendRequests} />
      <div className="flex flex-col gap-2">
        <SearchUserButton />
        <FriendList initialFriends={friends} />
      </div>
    </>
  );
}
