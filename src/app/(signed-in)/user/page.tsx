import { redirect } from "next/navigation";
import Avatar from "../../../components/Avatar";
import type { User } from "../../../schemas/user";
import { createServerSideHelpers } from "../../../utils/trpc/server";

export const runtime = "edge";

export default async function UserPage(): Promise<JSX.Element> {
  const trpc = await createServerSideHelpers();

  let currentUser: User;
  try {
    currentUser = await trpc.users.getCurrent.fetch();
  } catch {
    redirect("/sign-in/");
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar size="large" user={currentUser} />
    </div>
  );
}
