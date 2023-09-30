import { ChevronDownIcon } from "@heroicons/react/24/outline";
import cx from "classix";
import type { Route } from "next";
import Link from "next-intl/link";
import type { ReactNode } from "react";
import { useServerTranslations } from "../utils/translations/server";
import Menu from "./Menu";

export default function Navbar(): JSX.Element {
  const t = useServerTranslations("Navbar");

  const links: Array<{ key: string; className?: string; children: ReactNode; href: Route }> = [
    { key: "friends", children: t("friends"), href: "/" },
    { key: "my-wishes", children: t("myWishes"), href: "/user" },
    { key: "search", children: t("search"), href: "/search" },
    { key: "settings", children: t("settings"), href: "/settings" },
  ];

  return (
    <nav className="navbar sticky top-0 z-10 mb-2 bg-base-100 px-4">
      <div className="flex-1">
        <Link className="btn btn-ghost" href="/">
          <h1>{t("title")}</h1>
        </Link>
      </div>
      <ul className="hidden gap-4 md:flex">
        {links.map((link) => (
          <Link className={cx("btn btn-ghost", link.className)} href={link.href} key={link.key}>
            {link.children}
          </Link>
        ))}
      </ul>
      <Menu
        buttonClassName="btn btn-circle btn-ghost md:hidden"
        items={links}
        menuClassName="w-52"
        position="left"
      >
        <ChevronDownIcon className="h-6 w-6" />
      </Menu>
    </nav>
  );
}
