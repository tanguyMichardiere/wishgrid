import DeleteCurrentUserButton from "../../../components/DeleteCurrentUserButton";
import SignOutButton from "../../../components/SignOutButton";
import ThemeMenu from "../../../components/ThemeMenu";
import { createServerSideHelpers } from "../../../utils/trpc/server";
import ManageAccountLink from "./ManageAccountLink";

export const runtime = "edge";

export default async function SettingsPage(): Promise<JSX.Element> {
  const trpc = await createServerSideHelpers();

  const currentUser = await trpc.users.getCurrent.fetch();

  return (
    <div className="mx-4 flex grow flex-col justify-between gap-16">
      <div className="flex flex-col items-center gap-8">
        <div className="flex w-full items-center justify-between">
          <p>Theme</p>
          <ThemeMenu position="left" />
        </div>
        <ManageAccountLink initialCurrentUser={currentUser} />
        <SignOutButton />
      </div>
      <div className="flex justify-center">
        <DeleteCurrentUserButton />
      </div>
    </div>
  );
}
