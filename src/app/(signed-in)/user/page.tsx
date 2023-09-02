import Avatar from "../../../components/Avatar";
import { createServerSideHelpers } from "../../../utils/trpc/server";

export const runtime = "edge";

export default async function UserPage(): Promise<JSX.Element> {
  const trpc = await createServerSideHelpers();

  const currentUser = await trpc.users.getCurrent.fetch();

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar initialUser={currentUser} size="large" userId={currentUser.id} />
      {/* TODO */}
      TODO
    </div>
  );
}
