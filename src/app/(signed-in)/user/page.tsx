import Avatar from "../../../components/Avatar";
import NewWishCard from "../../../components/NewWishCard";
import { createServerSideHelpers } from "../../../utils/trpc/server";
import OwnWishList from "./OwnWishList";

export const runtime = "nodejs";

export default async function UserPage(): Promise<JSX.Element> {
  const trpc = await createServerSideHelpers();

  const [currentUser, wishes] = await Promise.all([
    trpc.users.getCurrent.fetch(),
    trpc.wishes.listOwn.fetch(),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <Avatar className="self-center" initialUser={currentUser} size="large" />
      <NewWishCard initialCurrentUser={currentUser} />
      <ul className="flex flex-col">
        <OwnWishList initialWishes={wishes} />
      </ul>
    </div>
  );
}
