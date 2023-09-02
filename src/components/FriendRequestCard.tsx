import type { User } from "../schemas/user";
import { displayNames } from "../utils/displayNames";
import AcceptFriendRequestButton from "./AcceptFriendRequestButton";
import Avatar from "./Avatar";
import DeclineFriendRequestButton from "./DeclineFriendRequestButton";

type Props = {
  user: User;
};

export default function FriendRequestsCard(props: Props): JSX.Element {
  const names = displayNames(props.user);

  return (
    <div className="@container">
      <div className="border-base-900 flex max-w-sm flex-grow flex-col items-center gap-4 bg-base-100 px-4 py-2 @sm:mx-2 @sm:mb-2 @sm:rounded-xl @sm:shadow-xl">
        <div className="flex flex-row items-center gap-4">
          <Avatar initialUser={props.user} size="small" userId={props.user.id} />
          <div className="flex flex-col">
            <div>{names[0]}</div>
            <div className="text-xs">{names[1]}</div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <DeclineFriendRequestButton userId={props.user.id} />
          <AcceptFriendRequestButton userId={props.user.id} />
        </div>
      </div>
    </div>
  );
}