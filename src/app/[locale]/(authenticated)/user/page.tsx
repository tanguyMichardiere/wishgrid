import Avatar from "../../../../components/Avatar";
import CopyUserLinkButton from "../../../../components/CopyUserLinkButton";
import NewWishButton from "../../../../components/NewWishButton";
import { getCurrentUser } from "../../../../utils/serverQueries/users/getCurrent";
import { getWishesListOwn } from "../../../../utils/serverQueries/wishes/listOwn";
import OwnWishList from "./OwnWishList";

export default async function UserPage(): Promise<JSX.Element> {
  const [currentUser, wishes] = await Promise.all([getCurrentUser(), getWishesListOwn()]);

  return (
    <div className="flex flex-col gap-4">
      <Avatar className="self-center" size="large" user={currentUser} />
      <CopyUserLinkButton id={currentUser.id} />
      <NewWishButton />
      <ul className="flex flex-col">
        <OwnWishList initialWishes={wishes} />
      </ul>
    </div>
  );
}
