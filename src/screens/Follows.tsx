import FollowPreviewCard from "../components/FollowPreviewCard";
import Spinner from "../components/Spinner";

import { trpc } from "../utils/trpc";

export default function FollowsScreen(): JSX.Element {
  const follows = trpc.user.follow.list.useQuery();

  return (
    <ul>
      {follows.data !== undefined ? (
        follows.data.map((user) => (
          <li key={user.id}>
            <FollowPreviewCard user={user} />
          </li>
        ))
      ) : (
        <Spinner />
      )}
    </ul>
  );
}
