import Identicon from "identicon.js";
import { signOut as _signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo } from "react";

export default function Navbar(): JSX.Element {
  const session = useSession({ required: true });

  const signOut = useCallback(async function () {
    await _signOut();
  }, []);

  const imageSrc = useMemo(
    () =>
      session.status === "loading"
        ? null
        : session.data.user.image ??
          `data:image/png;base64,${new Identicon(session.data.user.id).toString()}`,
    [session.status, session.data?.user.image, session.data?.user.id]
  );

  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn-ghost btn text-xl normal-case" href="/">
          Wisher
        </Link>
      </div>
      {imageSrc !== null && (
        // imageSrc === null iff session.status === "loading"
        <div className="flex-none gap-2">
          <div className="dropdown-end dropdown">
            <label className="btn-ghost btn-circle avatar btn" tabIndex={0}>
              <div className="w-10 rounded-full">
                <Image alt="profile picture" height={40} src={imageSrc} width={40} />
              </div>
            </label>
            <ul
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
              tabIndex={0}
            >
              <li>
                <Link className="justify-between" href="/profile">
                  Profile
                  <span className="badge">New</span>
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
