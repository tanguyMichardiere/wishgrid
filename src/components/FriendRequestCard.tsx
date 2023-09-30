import type { User } from "../server/db/types/user";
import AcceptFriendRequestButton from "./AcceptFriendRequestButton";
import Avatar from "./Avatar";
import Card from "./Card";
import DeclineFriendRequestButton from "./DeclineFriendRequestButton";

type Props = {
  user: User;
};

export default function FriendRequestsCard(props: Props): JSX.Element {
  return (
    <Card className="flex-col @sm:flex-row">
      <div className="flex flex-row items-center gap-4">
        <Avatar size="small" user={props.user} />
        {props.user.username}
      </div>
      <div className="flex flex-row items-center gap-4">
        <DeclineFriendRequestButton userId={props.user.id} />
        <AcceptFriendRequestButton userId={props.user.id} />
      </div>
    </Card>
  );
}
