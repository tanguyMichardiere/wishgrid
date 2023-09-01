"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import cx from "classix";
import type { Route } from "next";
import Link from "next/link";
import { useMemo, type ReactNode } from "react";
import { trpc } from "../utils/trpc/client";
import Menu from "./Menu";

type NavbarLinksProps = {
  initialFriendRequestsCount: number;
};

export function NavbarLinks(props: NavbarLinksProps): JSX.Element {
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
              <span className={cx("badge", friendRequestsCount.data === 0 && "badge-ghost")}>
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
      <ul className="hidden gap-4 md:flex">
        {links.map((link) => (
          <Link className="btn btn-ghost" href={link.href} key={link.key}>
            {link.children}
          </Link>
        ))}
      </ul>
      <Menu
        buttonClassName={cx(
          "btn-ghost btn-circle btn md:hidden",
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
