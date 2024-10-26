import type { JSX } from "react";
import { Avatar } from "../../../../../components/avatar";
import { getFriendRequestsStatus } from "../../../../../utils/server-queries/friend-requests/status";
import { getUser } from "../../../../../utils/server-queries/users/get";
import { Buttons } from "./buttons";
import type { Params } from "./params";

type Props = {
	params: Promise<Params>;
};

export default async function UserIdPage(props: Props): Promise<JSX.Element> {
	const params = await props.params;

	const user = await getUser(params.id);
	const friendRequestsStatus = await getFriendRequestsStatus(params.id);

	return (
		<div className="flex flex-col items-center gap-4">
			<div className="flex flex-col items-center gap-2">
				<Avatar size="large" user={user} />
				<h3 className="text-lg">{user.name}</h3>
			</div>
			<Buttons initialFriendRequestsStatus={friendRequestsStatus} userId={user.id} />
		</div>
	);
}
