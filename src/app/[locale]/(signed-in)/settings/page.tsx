import Link from "next-intl/link";
import dynamic from "next/dynamic";
import DeleteCurrentUserButton from "../../../../components/DeleteCurrentUserButton";
import SignOutButton from "../../../../components/SignOutButton";

const ThemeMenu = dynamic(() => import("../../../../components/ThemeMenu"), { ssr: false });

export const runtime = "nodejs";

export default function SettingsPage(): JSX.Element {
  return (
    <div className="mx-4 flex grow flex-col justify-between gap-16">
      <div className="flex flex-col items-center gap-8">
        <div className="flex w-full items-center justify-between">
          <p>Theme</p>
          <ThemeMenu position="left" />
        </div>
        <Link className="link" href="/manage-account">
          Manage account
        </Link>
        <SignOutButton />
      </div>
      <div className="flex justify-center">
        <DeleteCurrentUserButton />
      </div>
    </div>
  );
}
