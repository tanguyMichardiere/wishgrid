import type { JSX } from "react";
import { Avatar } from "../../../../components/avatar";
import { DeleteCurrentUserButton } from "../../../../components/delete-current-user-button";
import { getCurrentUser } from "../../../../utils/server-queries/users/get-current";
import { UpdateUser } from "./update-user";

export default async function ManageAccountPage(): Promise<JSX.Element> {
	const currentUser = await getCurrentUser();

	return (
		<div className="mx-4 flex flex-col items-center gap-8">
			<Avatar className="self-center" size="large" user={currentUser} />
			<UpdateUser />
			<div className="pt-20">
				<DeleteCurrentUserButton />
			</div>
		</div>
	);
}
