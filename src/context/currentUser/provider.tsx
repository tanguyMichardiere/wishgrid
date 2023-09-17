"use client";

import type { ReactNode } from "react";
import type { User } from "../../server/db/types/user";
import { trpc } from "../../utils/trpc/client";
import { currentUserContext } from "./context";

type Props = {
  children: ReactNode;
  initialCurrentUser: User;
};

export default function CurrentUserContextProviderClient(props: Props): JSX.Element {
  const currentUser = trpc.users.getCurrent.useQuery(undefined, {
    initialData: props.initialCurrentUser,
  });

  return (
    <currentUserContext.Provider value={currentUser.data}>
      {props.children}
    </currentUserContext.Provider>
  );
}
