import type { JSX } from "react";
import { Avatar } from "../../../../../components/avatar";
import { getFriend } from "../../../../../utils/server-queries/friends/get";
import { getWishesList } from "../../../../../utils/server-queries/wishes/list";
import type { Params } from "./params";
import { WishList } from "./wish-list";

type Props = { params: Params };

export default async function FriendIdPage(props: Props): Promise<JSX.Element> {
	const friend = await getFriend(props.params.id);
	const wishes = await getWishesList(props.params.id);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col items-center gap-2 self-center">
				<Avatar size="large" user={friend} />
				<h3 className="text-lg">{friend.name}</h3>
			</div>
			<ul className="flex flex-col">
				<WishList initialWishes={wishes} userId={props.params.id} />
			</ul>
		</div>
	);
}
