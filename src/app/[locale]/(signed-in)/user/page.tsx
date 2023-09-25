import Avatar from "../../../../components/Avatar";
import NewWishButton from "../../../../components/NewWishButton";
import { createServerSideHelpers } from "../../../../utils/trpc/server";
import OwnWishList from "./OwnWishList";

export const runtime = "edge";

export default async function UserPage(): Promise<JSX.Element> {
  const trpc = await createServerSideHelpers();

  const [currentUser, wishes] = await Promise.all([
    trpc.users.getCurrent.fetch(),
    trpc.wishes.listOwn.fetch(),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <Avatar className="self-center" size="large" user={currentUser} />
      <NewWishButton />
      <ul className="flex flex-col">
        <OwnWishList initialWishes={wishes} />
      </ul>
    </div>
  );
}