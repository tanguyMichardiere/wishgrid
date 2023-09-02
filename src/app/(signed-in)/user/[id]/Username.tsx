"use client";

import type { User } from "../../../../schemas/user";
import { displayNames } from "../../../../utils/displayNames";
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

  const names = displayNames(user.data);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg">{names[0]}</h3>
      <h2 className="text-sm">{names[1]}</h2>
    </div>
  );
}
