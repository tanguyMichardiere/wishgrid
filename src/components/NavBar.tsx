import Link from "next/link";
import { useRouter } from "next/router";

import { Cog6ToothIcon, GiftIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { cx } from "classix";

const tabs = [
  {
    label: "Follows",
    Icon: GiftIcon,
    href: "/",
  },
  {
    label: "Profile",
    Icon: UserCircleIcon,
    href: "/profile",
  },
  {
    label: "Settings",
    Icon: Cog6ToothIcon,
    href: "/settings",
  },
];

export default function NavBar(): JSX.Element {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 flex w-full justify-center gap-1 p-1">
      {tabs.map((tab) => (
        <Link
          className={cx(
            "flex w-full max-w-[12rem] flex-col items-center rounded-lg py-2 px-4",
            router.pathname === tab.href
              ? "bg-black/20 dark:bg-white/20"
              : "hover:bg-black/10 dark:hover:bg-white/10"
          )}
          href={tab.href}
          key={tab.label}
        >
          <tab.Icon className="h-6 w-6" />
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
