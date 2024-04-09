import type { JSX } from "react";
import type { User } from "../server/database/types/user";
import { AcceptFriendRequestButton } from "./accept-friend-request-button";
import { Avatar } from "./avatar";
import { Card } from "./card";
import { DeclineFriendRequestButton } from "./decline-friend-request-button";

type Props = {
	user: User;
};

export function FriendRequestsCard(props: Props): JSX.Element {
	return (
		<Card className="flex-col @sm:flex-row">
			<div className="flex flex-row items-center gap-4">
				<Avatar size="small" user={props.user} />
				{props.user.name}
			</div>
			<div className="flex flex-row items-center gap-4">
				<DeclineFriendRequestButton userId={props.user.id} />
				<AcceptFriendRequestButton userId={props.user.id} />
			</div>
		</Card>
	);
}
