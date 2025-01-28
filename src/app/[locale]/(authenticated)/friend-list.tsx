"use client";

import type { JSX } from "react";
import { FriendPreviewListRow } from "../../../components/friend-preview-list-row";
import { Link } from "../../../i18n/routing";
import type { Friend } from "../../../server/database/types/user";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";

type Props = {
	initialFriends: Friend[];
};

export function FriendList(props: Props): JSX.Element {
	const t = useClientTranslations("client.FriendList");

	const friends = trpc.friends.list.useQuery(undefined, { initialData: props.initialFriends });

	if (friends.data.length === 0) {
		return (
			<>
				<p className="text-center">{t("text")}</p>
				<Link className="link text-center" href="/user">
					{t("link")}
				</Link>
			</>
		);
	}

	return (
		<ul className="list">
			{friends.data.map((friend) => (
				<Link
					key={friend.id}
					className="list-row transition-colors hover:bg-base-200"
					href={`/friend/${friend.id}`}
				>
					<FriendPreviewListRow friend={friend} />
				</Link>
			))}
		</ul>
	);
}
