import Link from "next/link";

import { NEXT_PUBLIC_TITLE } from "../env/client";
import ThemeMenu from "./ThemeMenu";

export default function TopBar(): JSX.Element {
  return (
    <div className="flex items-center justify-between p-4">
      <Link href="/">
        <h1>{NEXT_PUBLIC_TITLE}</h1>
      </Link>
      <ThemeMenu />
    </div>
  );
}
