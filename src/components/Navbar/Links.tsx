"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import cx from "classix";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo } from "react";
import type { User } from "../../schemas/user";
import { missesNames } from "../../utils/displayNames";
import { trpc } from "../../utils/trpc/client";
import Menu from "../Menu";

type Props = {
  initialCurrentUser: User;
  initialFriendRequestsCount: number;
};

export default function Links(props: Props): JSX.Element {
  const currentUser = trpc.users.getCurrent.useQuery(undefined, {
    initialData: props.initialCurrentUser,
  });

  const currentUserMissesNames = useMemo(() => missesNames(currentUser.data), [currentUser.data]);

  const friendRequestsCount = trpc.friendRequests.count.useQuery(undefined, {
    initialData: props.initialFriendRequestsCount,
  });

  const links: Array<{ key: string; className?: string; children: ReactNode; href: Route }> =
    useMemo(
      () => [
        { key: "wish-list", children: "Wish list", href: "/user" },
        { key: "search", children: "Search", href: "/search" },
        {
          key: "friend-requests",
          className: "justify-between",
          children: (
            <>
              Friend requests
              <span
                className={cx(
                  "badge",
                  friendRequestsCount.data > 0 ? "badge-primary" : "badge-ghost",
                )}
              >
                {friendRequestsCount.data}
              </span>
            </>
          ),
          href: "/friend-requests",
        },
        {
          key: "settings",
          className: cx(currentUserMissesNames && "ring ring-primary ring-offset-base-100"),
          children: "Settings",
          href: "/settings",
        },
      ],
      [currentUserMissesNames, friendRequestsCount.data],
    );

  return (
    <>
      <ul className="hidden gap-4 md:flex">
        {links.map((link) => (
          <Link className={cx("btn btn-ghost", link.className)} href={link.href} key={link.key}>
            {link.children}
          </Link>
        ))}
      </ul>
      <Menu
        buttonClassName={cx(
          "btn btn-circle btn-ghost md:hidden",
          (friendRequestsCount.data > 0 || currentUserMissesNames) &&
            "ring ring-primary ring-offset-base-100",
        )}
        items={links}
        menuClassName="w-52"
        position="left"
      >
        <ChevronDownIcon className="h-6 w-6" />
      </Menu>
    </>
  );
}
