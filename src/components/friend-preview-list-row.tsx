import cx from "classix";
import { type JSX, useMemo } from "react";
import type { Friend } from "../server/database/types/user";
import { useClientTranslations } from "../utils/translations/client";
import { Avatar } from "./avatar";

type Props = { friend: Friend };

export function FriendPreviewListRow(props: Props): JSX.Element {
	const t = useClientTranslations("client.FriendPreviewCard");

	const toolTip = useMemo(() => {
		if (props.friend.newWishCount > 0) {
			if (props.friend.wishCount === props.friend.newWishCount) {
				return t("onlyNewWishCountTooltip", { count: props.friend.newWishCount });
			}
			return t("newWishCountTooltip", {
				count: props.friend.wishCount,
				newCount: props.friend.newWishCount,
			});
		}
		return t("wishCountTooltip", { count: props.friend.wishCount });
	}, [props.friend, t]);

	return (
		<>
			<Avatar size="small" user={props.friend} />
			<div className="flex items-center">{props.friend.name}</div>
			<div className="tooltip tooltip-left flex items-center" data-tip={toolTip}>
				<span className={cx("badge", props.friend.newWishCount > 0 && "badge-primary")}>
					{props.friend.wishCount}
				</span>
			</div>
		</>
	);
}
