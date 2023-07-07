import { getFriendRequests } from "../../../server/friendRequests";
import FriendRequestsCard from "./FriendRequestCard";

export const runtime = "edge";

export default async function FriendRequestsPage(): Promise<JSX.Element> {
  const friendRequests = await getFriendRequests();

  return (
    <ul className="flex flex-col">
      {friendRequests.map((user) => (
        <li key={user.id}>
          <FriendRequestsCard user={user} />
        </li>
      ))}
    </ul>
  );
}
