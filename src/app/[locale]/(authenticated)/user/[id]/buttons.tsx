"use client";

import type { JSX } from "react";
import { AcceptFriendRequestButton } from "../../../../../components/accept-friend-request-button";
import { CancelFriendRequestButton } from "../../../../../components/cancel-friend-request-button";
import { DeclineFriendRequestButton } from "../../../../../components/decline-friend-request-button";
import { RequestFriendButton } from "../../../../../components/request-friend-button";
import { trpc } from "../../../../../utils/trpc/client";

type Props = {
	userId: string;
	initialFriendRequestsStatus: {
		from: boolean;
		to: boolean;
	};
};

export function Buttons(props: Props): JSX.Element {
	const friendRequestsStatus = trpc.friendRequests.status.useQuery(
		{ userId: props.userId },
		{ initialData: props.initialFriendRequestsStatus },
	);

	return (
		<>
			{friendRequestsStatus.data.from ? (
				<div className="flex gap-4">
					<DeclineFriendRequestButton userId={props.userId} />
					<AcceptFriendRequestButton userId={props.userId} />
				</div>
			) : friendRequestsStatus.data.to ? (
				<CancelFriendRequestButton userId={props.userId} />
			) : (
				<RequestFriendButton userId={props.userId} />
			)}
		</>
	);
}
