import Avatar from "../../../components/Avatar";
import { getCurrentUser } from "../../../server/users";

export const runtime = "edge";

export default async function UserPage(): Promise<JSX.Element> {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar size="large" user={currentUser} />
    </div>
  );
}
