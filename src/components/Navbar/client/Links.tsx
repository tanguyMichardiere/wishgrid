"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import cx from "classix";
import type { Route } from "next";
import Link from "next-intl/link";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { trpc } from "../../../utils/trpc/client";
import Menu from "../../Menu";

export type Props = {
  initialFriendRequestsCount: number;
  friends: string;
  myWishes: string;
  search: string;
  friendRequests: string;
  settings: string;
};

export default function Links(props: Props): JSX.Element {
  const friendRequestsCount = trpc.friendRequests.count.useQuery(undefined, {
    initialData: props.initialFriendRequestsCount,
  });

  const links: Array<{ key: string; className?: string; children: ReactNode; href: Route }> =
    useMemo(
      () => [
        { key: "friends", children: props.friends, href: "/" },
        { key: "my-wishes", children: props.myWishes, href: "/user" },
        { key: "search", children: props.search, href: "/search" },
        {
          key: "friend-requests",
          className: "justify-between",
          children: (
            <>
              {props.friendRequests}
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
        { key: "settings", children: props.settings, href: "/settings" },
      ],
      [
        friendRequestsCount.data,
        props.friendRequests,
        props.friends,
        props.myWishes,
        props.search,
        props.settings,
      ],
    );

  return (
    <>
      <ul className="hidden gap-4 lg:flex">
        {links.map((link) => (
          <Link className={cx("btn btn-ghost", link.className)} href={link.href} key={link.key}>
            {link.children}
          </Link>
        ))}
      </ul>
      <Menu
        buttonClassName={cx(
          "btn btn-circle btn-ghost lg:hidden",
          friendRequestsCount.data > 0 && "ring ring-primary ring-offset-base-100",
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
