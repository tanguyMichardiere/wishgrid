import type { User } from "@clerk/nextjs/dist/types/server";
import ActionButton from "../../../components/ActionButton";
import Avatar from "../../../components/Avatar";
import { acceptFriendRequest, declineFriendRequest } from "../../../server/actions/friendRequests";
import { displayName } from "../../../utils/displayName";

type Props = {
  user: User;
};

export default function FriendRequestsCard(props: Props): JSX.Element {
  async function decline() {
    "use server";

    await declineFriendRequest(props.user.id);
  }

  async function accept() {
    "use server";

    await acceptFriendRequest(props.user.id);
  }

  return (
    <div className="@container">
      <div className="border-base-900 flex max-w-sm flex-grow flex-col items-center gap-4 bg-base-100 px-4 py-2 transition-colors hover:bg-base-200 @sm:mx-2 @sm:mb-2 @sm:rounded-xl @sm:shadow-xl">
        <div className="flex flex-row items-center gap-4">
          <Avatar size="small" user={props.user} />
          {displayName(props.user)[0]}
        </div>
        <div className="flex flex-row items-center gap-4">
          <ActionButton action={decline} className="btn-ghost">
            Decline
          </ActionButton>
          <ActionButton action={accept} className="btn-primary">
            Accept
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
