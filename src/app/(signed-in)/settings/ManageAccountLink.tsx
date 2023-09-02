"use client";

import cx from "classix";
import Link from "next/link";
import { useMemo } from "react";
import type { User } from "../../../schemas/user";
import { missesNames } from "../../../utils/displayNames";
import { trpc } from "../../../utils/trpc/client";

type Props = {
  initialCurrentUser: User;
};

export default function ManageAccountLink(props: Props): JSX.Element {
  const currentUser = trpc.users.getCurrent.useQuery(undefined, {
    initialData: props.initialCurrentUser,
  });

  const currentUserMissingNames = useMemo(() => missesNames(currentUser.data), [currentUser.data]);

  return (
    <div className="flex flex-col items-center gap-2">
      {currentUserMissingNames && (
        <p className="text-center">Please setup a username, or a first and/or last name</p>
      )}
      <Link
        className={cx(
          "link",
          currentUserMissingNames && "rounded-md p-2 ring ring-primary ring-offset-base-100",
        )}
        href="/manage-account/"
      >
        Manage account
      </Link>
    </div>
  );
}
