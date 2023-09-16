"use client";

import WishPreviewCard from "../../../../../components/WishPreviewCard";
import type { User } from "../../../../../server/db/types/user";
import type { Wish } from "../../../../../server/db/types/wishes";
import { trpc } from "../../../../../utils/trpc/client";

type Props = {
  initialCurrentUser: User;
  userId: string;
  initialWishes: Array<Wish>;
};

export default function WishList(props: Props): JSX.Element {
  const wishes = trpc.wishes.list.useQuery(
    { userId: props.userId },
    { initialData: props.initialWishes },
  );

  if (wishes.data.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p>No wish</p>
      </div>
    );
  }

  return (
    <>
      {wishes.data.map((wish) => (
        <li key={wish.id}>
          <WishPreviewCard
            initialCurrentUser={props.initialCurrentUser}
            userId={props.userId}
            wish={wish}
          />
        </li>
      ))}
    </>
  );
}
