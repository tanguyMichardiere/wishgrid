import Link from "next/link";
import { createServerSideHelpers } from "../../utils/trpc/server";
import Links from "./Links";

export default async function Navbar(): Promise<JSX.Element> {
  const trpc = await createServerSideHelpers();

  const currentUser = await trpc.users.getCurrent.fetch();

  const friendRequestsCount = await trpc.friendRequests.count.fetch();

  return (
    <nav className="navbar sticky top-0 z-40 mb-2 bg-base-100 px-4">
      <div className="flex-1">
        <Link className="btn btn-ghost" href="/">
          <h1>WishGrid</h1>
        </Link>
      </div>
      <Links initialCurrentUser={currentUser} initialFriendRequestsCount={friendRequestsCount} />
    </nav>
  );
}
