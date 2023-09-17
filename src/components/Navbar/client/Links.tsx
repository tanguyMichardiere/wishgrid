"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import cx from "classix";
import type { Route } from "next";
import Link from "next-intl/link";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { trpc } from "../../../utils/trpc/client";
import Menu from "../../Menu";
import type { LinksProps } from ".././props";

export default function Links(props: LinksProps): JSX.Element {
  const friendRequestsCount = trpc.friendRequests.count.useQuery(undefined, {
    initialData: props.initialFriendRequestsCount,
  });

  const links: Array<{ key: string; className?: string; children: ReactNode; href: Route }> =
    useMemo(
      () => [
        { key: "friends", children: "Friends", href: "/" },
        { key: "my-wishes", children: "My wishes", href: "/user" },
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
        { key: "settings", children: "Settings", href: "/settings" },
      ],
      [friendRequestsCount.data],
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
