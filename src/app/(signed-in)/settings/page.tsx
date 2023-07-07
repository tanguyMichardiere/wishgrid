import Link from "next/link";
import ThemeMenu from "../../../components/ThemeMenu";
import DeleteCurrentUserButton from "./DeleteCurrentUserButton";
import SignOutButton from "./SignOutButton";

export const runtime = "edge";

export default function SettingsPage(): JSX.Element {
  return (
    <div className="flex grow flex-col justify-between gap-16">
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
