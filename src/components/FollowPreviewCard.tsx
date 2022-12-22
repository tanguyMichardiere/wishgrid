import Link from "next/link";

import type { User } from "@prisma/client";

type Props = {
  user: User;
};

export default function FollowPreviewCard(props: Props): JSX.Element {
  return (
    <Link className="block rounded-md p-2 shadow-md" href={`/user/${props.user.id}`}>
      {props.user.name ?? props.user.id}
    </Link>
  );
}
