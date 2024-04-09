import type { JSX } from "react";
import { getFriendRequestsList } from "../../../utils/server-queries/friend-requests/list";
import { getFriendsList } from "../../../utils/server-queries/friends/list";
import { FriendList } from "./friend-list";
import { FriendRequestList } from "./friend-request-list";

export default async function HomePage(): Promise<JSX.Element> {
	const friends = await getFriendsList();
	const friendRequests = await getFriendRequestsList();

	return (
		<>
			<FriendRequestList initialFriendRequests={friendRequests} />
			<FriendList initialFriends={friends} />
		</>
	);
}
