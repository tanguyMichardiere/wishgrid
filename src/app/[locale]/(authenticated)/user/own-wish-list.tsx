"use client";

import type { JSX } from "react";
import { OwnWishListRow } from "../../../../components/own-wish-list-row";
import type { OwnWish } from "../../../../server/database/types/wishes";
import { useClientTranslations } from "../../../../utils/translations/client";
import { trpc } from "../../../../utils/trpc/client";

type Props = {
	initialWishes: OwnWish[];
};

export function OwnWishList(props: Props): JSX.Element {
	const t = useClientTranslations("client.OwnWishList");

	const wishes = trpc.wishes.listOwn.useQuery(undefined, { initialData: props.initialWishes });

	if (wishes.data.length === 0) {
		return (
			<div className="flex flex-col items-center">
				<p>{t("noWish")}</p>
			</div>
		);
	}

	return (
		<ul className="list rounded-box bg-base-100 shadow-md">
			{wishes.data.map((wish) => (
				<li key={wish.id} className="list-row">
					<OwnWishListRow wish={wish} />
				</li>
			))}
		</ul>
	);
}
