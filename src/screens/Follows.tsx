import FollowPreviewCard from "../components/FollowPreviewCard";
import Spinner from "../components/Spinner";

import { trpc } from "../utils/trpc";

export default function FollowsScreen(): JSX.Element {
  const follows = trpc.user.follow.list.useQuery();

  if (follows.data === undefined) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <ul>
      {follows.data.map((user) => (
        <li key={user.id}>
          <FollowPreviewCard user={user} />
        </li>
      ))}
    </ul>
  );
}
