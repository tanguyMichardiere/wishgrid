import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { cx } from "classix";
import { signOut as _signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { trpc } from "../utils/trpc";
import Avatar from "./Avatar";

type Props = {
  withBackButton?: boolean;
};

export default function Navbar({ withBackButton = false }: Props): JSX.Element {
  const router = useRouter();

  const session = useSession({ required: true });

  const friendRequestsCount = trpc.user.friend.request.count.useQuery();

  const signOut = useCallback(async function () {
    await _signOut();
  }, []);

  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        {withBackButton && (
          <button className="w-fit p-2" onClick={router.back} title="back" type="button">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        )}
        <Link className="btn-ghost no-animation btn text-xl normal-case" href="/">
          Wisher
        </Link>
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
