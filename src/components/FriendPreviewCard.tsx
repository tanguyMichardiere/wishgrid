import type { User } from "@prisma/client";
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
  user: User;
};

export default function FriendPreviewCard(props: Props): JSX.Element {
  return (
    <Link
      className="card flex flex-row items-center justify-around bg-base-100 p-2 shadow-xl"
      href={`/user/${props.user.id}`}
    >
      <Avatar user={props.user} />
      {props.user.name ?? props.user.id}
    </Link>
  );
}
