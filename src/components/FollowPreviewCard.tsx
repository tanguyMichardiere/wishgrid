import type { User } from "@prisma/client";
import Link from "next/link";

type Props = {
  user: User;
};

export default function FollowPreviewCard(props: Props): JSX.Element {
  return (
    <Link className="card bg-base-100 p-2 shadow-xl" href={`/user/${props.user.id}`}>
      {props.user.name ?? props.user.id}
    </Link>
  );
}
