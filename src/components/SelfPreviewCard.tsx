import Link from "next/link";

import type { User } from "@prisma/client";

type Props = {
  user: User;
};

export default function SelfPreviewCard(props: Props): JSX.Element {
  return (
    <Link className="flex items-center justify-center rounded-md p-2 shadow-md" href="/user/me">
      <div>{props.user.id}</div>
    </Link>
  );
}