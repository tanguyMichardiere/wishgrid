"use client";

import type { User } from "../../server/db/types/user";
import { trpc } from "../../utils/trpc/client";
import UnreserveWishButton from "../UnreserveWishButton";

type Props = {
  initialCurrentUser: User;
  reservedBy: User;
  userId: string;
  wishId: string;
};

export default function ReservedBy(props: Props): JSX.Element {
  const currentUser = trpc.users.getCurrent.useQuery(undefined, {
    initialData: props.initialCurrentUser,
  });

  return (
    <>
      <p>
        Reserved by: <span className="font-semibold">{props.reservedBy.username}</span>
        {props.reservedBy.id === currentUser.data.id && " (You)"}
      </p>
      {props.reservedBy.id === currentUser.data.id && (
        <UnreserveWishButton userId={props.userId} wishId={props.wishId} />
      )}
    </>
  );
}
