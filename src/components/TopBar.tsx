import Link from "next/link";

import { Cog6ToothIcon } from "@heroicons/react/24/outline";

import { NEXT_PUBLIC_TITLE } from "../env/client";

export default function TopBar(): JSX.Element {
  return (
    <div className="flex items-center justify-between p-4">
      <Link className="p-2" href="/">
        <h1>{NEXT_PUBLIC_TITLE}</h1>
      </Link>
      <Link className="p-2" href="/settings">
        <Cog6ToothIcon className="h-6 w-6" />
      </Link>
    </div>
  );
}
