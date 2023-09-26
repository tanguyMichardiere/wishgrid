import { getFriendRequestsList } from "../../../../utils/serverQueries/friendRequests/list";
import FriendRequestList from "./FriendRequestList";

export default async function FriendRequestsPage(): Promise<JSX.Element> {
  const friendRequests = await getFriendRequestsList();

  return (
    <ul className="flex flex-col">
      <FriendRequestList initialFriendRequests={friendRequests} />
    </ul>
  );
}
