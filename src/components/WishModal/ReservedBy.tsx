"use client";

import { useCurrentUser } from "../../context/currentUser/hook";
import type { User } from "../../server/db/types/user";
import UnreserveWishButton from "../UnreserveWishButton";

type Props = {
  reservedBy: User;
  userId: string;
  wishId: string;
};

export default function ReservedBy(props: Props): JSX.Element {
  const currentUser = useCurrentUser();

  return (
    <>
      <p>
        Reserved by: <span className="font-semibold">{props.reservedBy.username}</span>
        {props.reservedBy.id === currentUser.id && " (You)"}
      </p>
      {props.reservedBy.id === currentUser.id && (
        <UnreserveWishButton userId={props.userId} wishId={props.wishId} />
      )}
    </>
  );
}
