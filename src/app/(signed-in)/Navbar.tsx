import { UserButton } from "@clerk/nextjs";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import cx from "classix";
import Link from "next/link";
import Menu from "../../components/Menu";
import { getFriendRequestsCount } from "../../server/friendRequests";

export default async function Navbar(): Promise<JSX.Element> {
  const friendRequestsCount = await getFriendRequestsCount();

  return (
    <nav className="navbar sticky top-0 z-40 mb-2 gap-2 bg-base-100 px-4">
      <div className="flex-1">
        <Link className="text-xl normal-case" href="/">
          <h1>WishGrid</h1>
        </Link>
      </div>
      <Menu
        buttonClassName={cx(
          "btn-ghost btn-circle btn",
          friendRequestsCount > 0 && "ring ring-primary ring-offset-base-100"
        )}
        items={[
          { key: "wish-list", children: "Wish list", href: "/wish-list" },
          { key: "search", children: "Search", href: "/search" },
          {
            key: "friend-requests",
            className: "justify-between",
            children: (
              <>
                Friend requests
                <span className={cx("badge", friendRequestsCount === 0 && "badge-ghost")}>
                  {friendRequestsCount}
                </span>
              </>
            ),
            href: "/friend-requests",
          },
          { key: "settings", children: "Settings", href: "/settings" },
        ]}
        menuClassName="w-52"
        position="left"
      >
        <ChevronDownIcon className="h-6 w-6" />
      </Menu>
      <UserButton
        afterSignOutUrl="/"
        appearance={{ elements: { userButtonAvatarBox: "h-10 w-10" } }}
      />
    </nav>
  );
}
