import cx from "classix";
import type { Friend } from "../server/db/types/user";
import { useClientTranslations } from "../utils/translations/client";
import Avatar from "./Avatar";
import Card from "./Card";

type Props = {
  friend: Friend;
};

export default function FriendPreviewCard(props: Props): JSX.Element {
  const t = useClientTranslations("clientComponents.FriendPreviewCard");

  return (
    <Card className="justify-between">
      <div className="flex items-center gap-4">
        <Avatar size="small" user={props.friend} />
        {props.friend.username}
      </div>
      <div
        className="tooltip tooltip-left"
        data-tip={
          props.friend.newWishCount > 0
            ? t("newWishCountTooltip", {
                count: props.friend.wishCount,
                newCount: props.friend.newWishCount,
              })
            : t("wishCountTooltip", { count: props.friend.wishCount })
        }
      >
        <span className={cx("badge", props.friend.newWishCount > 0 && "badge-primary")}>
          {props.friend.wishCount}
        </span>
      </div>
    </Card>
  );
}
