import { getFriendRequestsCount } from "../../utils/serverQueries/friendRequests/count";
import NavbarContent from "./content";

export default async function Navbar(): Promise<JSX.Element> {
  const friendRequestsCount = await getFriendRequestsCount();

  return (
    <nav className="navbar sticky top-0 z-40 mb-2 bg-base-100 px-4">
      <NavbarContent initialFriendRequestsCount={friendRequestsCount} />
    </nav>
  );
}
