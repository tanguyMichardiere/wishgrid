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
    <Card>
      <div className="flex flex-row items-center gap-4">
        <Avatar initialUser={props.user} size="small" />
        {props.user.username}
      </div>
      <div className="flex flex-row items-center gap-4">
        <DeclineFriendRequestButton userId={props.user.id} />
        <AcceptFriendRequestButton userId={props.user.id} />
      </div>
    </Card>
  );
}
