import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { cx } from "classix";
import { signOut as _signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback } from "react";
import { trpc } from "../utils/trpc";
import Avatar from "./Avatar";

type Props = {
  backHref?: string;
  title?: string;
};

export default function Navbar(props: Props): JSX.Element {
  const session = useSession({ required: true });

  const friendRequestsCount = trpc.user.friend.request.count.useQuery();

  const signOut = useCallback(async function () {
    await _signOut();
  }, []);

  return (
    <nav className="navbar bg-base-100">
      <div className="flex flex-1 gap-2">
        {props.backHref !== undefined && (
          <Link href={props.backHref}>
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
        )}
        <Link className="text-xl normal-case" href="/">
          <h1>Wisher</h1>
        </Link>
        {props.title !== undefined && (
          <h2 className="line-clamp-1 text-xl font-light">{props.title}</h2>
        )}
      </div>
      {session.status !== "loading" && (
        <div className="flex-none gap-2">
          <div className="dropdown-end dropdown">
            <label className="btn-ghost btn-circle btn" tabIndex={0}>
              <Avatar user={session.data.user} />
            </label>
            <ul
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
              tabIndex={0}
            >
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link className="justify-between" href="/friend-requests">
                  Friend requests
                  {friendRequestsCount.isSuccess && (
                    <span className={cx("badge", friendRequestsCount.data === 0 && "badge-ghost")}>
                      {friendRequestsCount.data}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link href="/settings">Settings</Link>
              </li>
              <li>
                <button onClick={signOut} type="button">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
