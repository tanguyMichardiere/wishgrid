import type { JSX } from "react";
import type { User } from "../server/database/types/user";
import { AcceptFriendRequestButton } from "./accept-friend-request-button";
import { Avatar } from "./avatar";
import { DeclineFriendRequestButton } from "./decline-friend-request-button";

type Props = { user: User };

export function FriendRequestListRow(props: Props): JSX.Element {
	return (
		<>
			<Avatar size="small" user={props.user} />
			<div className="flex items-center">{props.user.name}</div>
			<DeclineFriendRequestButton userId={props.user.id} />
			<AcceptFriendRequestButton userId={props.user.id} />
		</>
	);
}
