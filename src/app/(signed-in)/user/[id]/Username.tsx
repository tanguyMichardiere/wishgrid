"use client";

import type { User } from "../../../../schemas/user";
import { trpc } from "../../../../utils/trpc/client";

type Props = {
  userId: string;
  initialUser: User;
};

export function Username(props: Props): JSX.Element {
  const user = trpc.users.get.useQuery(
    { userId: props.userId },
    { initialData: props.initialUser },
  );

  return <h3 className="text-lg">{user.data.username}</h3>;
}
