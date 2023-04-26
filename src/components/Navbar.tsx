import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { cx } from "classix";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo } from "react";
import { NEXT_PUBLIC_TITLE } from "../env";
import { trpc } from "../utils/trpc";
import Avatar from "./Avatar";
import Menu from "./Menu";
import Spinner from "./Spinner";

type Props = {
  backHref?: string;
  title?: string;
};

export default function Navbar(props: Props): JSX.Element {
  const session = useSession({ required: true });

  const friendRequestsCount = trpc.user.friend.request.count.useQuery();

  const showAvatarRing = useMemo(
    () => friendRequestsCount.isSuccess && friendRequestsCount.data > 0,
    [friendRequestsCount.isSuccess, friendRequestsCount.data]
  );

  return (
    <nav className="navbar sticky top-0 z-40 mb-2 bg-base-100 px-4">
      <div className="flex flex-1 gap-2">
        {props.backHref !== undefined && (
          <Link href={props.backHref}>
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
        )}
        <Link className="text-xl normal-case" href="/">
          <h1>{NEXT_PUBLIC_TITLE}</h1>
        </Link>
        {props.title !== undefined && (
          <>
            |<h2 className="line-clamp-1 text-xl font-light">{props.title}</h2>
          </>
        )}
      </div>
      {session.status === "authenticated" ? (
        <div className="flex-none gap-2">
          <Menu
            buttonClassName={cx(
              "btn-ghost btn-circle btn",
              showAvatarRing && "ring ring-primary ring-offset-base-100"
            )}
            items={[
              { key: "profile", children: "Profile", href: "/profile" },
              { key: "wish-list", children: "Wish list", href: "/wish-list" },
              { key: "search", children: "Search", href: "/search" },
              {
                key: "friend-requests",
                className: "justify-between",
                children: (
                  <>
                    Friend requests
                    {friendRequestsCount.isSuccess && (
                      <span
                        className={cx("badge", friendRequestsCount.data === 0 && "badge-ghost")}
                      >
                        {friendRequestsCount.data}
                      </span>
                    )}
                  </>
                ),
                href: "/friend-requests",
              },
              { key: "settings", children: "Settings", href: "/settings" },
              { key: "logout", children: "Logout", onClick: signOut },
            ]}
            menuClassName="w-52"
            position="left"
          >
            <Avatar size="small" user={session.data.user} />
          </Menu>
        </div>
      ) : (
        <Spinner />
      )}
    </nav>
  );
}
