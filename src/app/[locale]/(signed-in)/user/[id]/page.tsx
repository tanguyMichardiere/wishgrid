import Avatar from "../../../../../components/Avatar";
import { getFriendRequestsStatus } from "../../../../../utils/serverQueries/friendRequests/status";
import { getUser } from "../../../../../utils/serverQueries/users/get";
import Buttons from "./Buttons";
import type { Params } from "./params";

type Props = {
  params: Params;
};

export default async function UserIdPage(props: Props): Promise<JSX.Element> {
  const [user, friendRequestsStatus] = await Promise.all([
    getUser(props.params.id),
    getFriendRequestsStatus(props.params.id),
  ]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar size="large" user={user} />
        <h3 className="text-lg">{user.username}</h3>
      </div>
      <Buttons initialFriendRequestsStatus={friendRequestsStatus} userId={user.id} />
    </div>
  );
}
