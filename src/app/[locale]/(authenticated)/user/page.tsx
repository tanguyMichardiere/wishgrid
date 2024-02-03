import type { JSX } from "react";
import Avatar from "../../../../components/Avatar";
import NewWishButton from "../../../../components/NewWishButton";
import ShareUserLinkButton from "../../../../components/ShareUserLinkButton";
import { getCurrentUser } from "../../../../utils/serverQueries/users/getCurrent";
import { getWishesListOwn } from "../../../../utils/serverQueries/wishes/listOwn";
import ExportMenu from "./ExportMenu";
import OwnWishList from "./OwnWishList";

export default async function UserPage(): Promise<JSX.Element> {
  const currentUser = await getCurrentUser();
  const wishes = await getWishesListOwn();

  return (
    <div className="flex flex-col gap-4">
      <Avatar className="self-center" size="large" user={currentUser} />
      <div className="flex justify-center gap-2">
        <ShareUserLinkButton id={currentUser.id} />
        <ExportMenu position="left" />
      </div>
      <NewWishButton />
      <ul className="flex flex-col">
        <OwnWishList initialWishes={wishes} />
      </ul>
    </div>
  );
}
