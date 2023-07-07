import { redirect } from "next/navigation";
import ActionButton from "../../../../components/ActionButton";
import Avatar from "../../../../components/Avatar";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  createFriendRequest,
  declineFriendRequest,
} from "../../../../server/actions/friendRequests";
import { getFriendRequestsStatus } from "../../../../server/friendRequests";
import { getFriendsStatus } from "../../../../server/friends";
import { getCurrentUser, getUser } from "../../../../server/users";

export const runtime = "edge";

type Props = {
  params: Params;
};

export default async function UserIdPage(props: Props): Promise<JSX.Element> {
  const [currentUser, user] = await Promise.all([getCurrentUser(), getUser(props.params.id)]);

  if (currentUser.id === user.id) {
    redirect("/user");
  }

  const friendsStatus = await getFriendsStatus(user.id);

  if (friendsStatus) {
    redirect(`/friends/${user.id}`);
  }

  const friendRequestsStatus = await getFriendRequestsStatus(user.id);

  async function decline() {
    "use server";

    await declineFriendRequest(user.id);
  }

  async function accept() {
    "use server";

    await acceptFriendRequest(user.id);
  }

  async function cancel() {
    "use server";

    await cancelFriendRequest(user.id);
  }

  async function request() {
    "use server";

    await createFriendRequest(user.id);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar size="large" user={user} />
      <h3 className="text-lg">{user.username}</h3>
      {friendRequestsStatus.from ? (
        <div className="flex gap-4">
          <ActionButton action={decline} afterAction="router.refresh" className="btn-ghost">
            Decline
          </ActionButton>
          <ActionButton action={accept} afterAction="router.refresh" className="btn-primary">
            Accept
          </ActionButton>
        </div>
      ) : friendRequestsStatus.to ? (
        <ActionButton action={cancel} afterAction="router.refresh">
          Cancel friend request
        </ActionButton>
      ) : (
        <ActionButton action={request} afterAction="router.refresh">
          Request friend
        </ActionButton>
      )}
    </div>
  );
}
