import Avatar from "../../../../components/Avatar";
import DeleteCurrentUserButton from "../../../../components/DeleteCurrentUserButton";
import { getCurrentUser } from "../../../../utils/serverQueries/users/getCurrent";
import UpdateUser from "./UpdateUser";

export default async function ManageAccountPage(): Promise<JSX.Element> {
  const currentUser = await getCurrentUser();

  return (
    <div className="mx-4 flex flex-col items-center gap-8">
      <Avatar className="self-center" size="large" user={currentUser} />
      <UpdateUser />
      <div className="pt-20">
        <DeleteCurrentUserButton />
      </div>
    </div>
  );
}
