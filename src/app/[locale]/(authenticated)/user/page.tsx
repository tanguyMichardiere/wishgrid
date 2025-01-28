import type { JSX } from "react";
import { Avatar } from "../../../../components/avatar";
import { NewWishButton } from "../../../../components/new-wish-button";
import { ShareUserLinkButton } from "../../../../components/share-user-link-button";
import { getCurrentUser } from "../../../../utils/server-queries/users/get-current";
import { getWishesListOwn } from "../../../../utils/server-queries/wishes/list-own";
import { ExportMenu } from "./export-menu";
import { OwnWishList } from "./own-wish-list";

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
			<OwnWishList initialWishes={wishes} />
		</div>
	);
}
