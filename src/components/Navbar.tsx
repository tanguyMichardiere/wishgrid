import { signOut as _signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

export default function Navbar(): JSX.Element {
  const signOut = useCallback(async function () {
    await _signOut();
  }, []);

  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case">daisyUI</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown">
          <label className="btn-ghost btn-circle avatar btn" tabIndex={0}>
            <div className="w-10 rounded-full">
              <Image alt="profile" src="https://placeimg.com/80/80/people" />
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
    </nav>
  );
}
