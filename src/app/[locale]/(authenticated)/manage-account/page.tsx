import dynamic from "next/dynamic";
import Avatar from "../../../../components/Avatar";
import DeleteCurrentUserButton from "../../../../components/DeleteCurrentUserButton";
import { getCurrentUser } from "../../../../utils/serverQueries/users/getCurrent";

// cannot be server-rendered because it uses FileList which is browser-only
const UpdateUser = dynamic(() => import("./UpdateUser"), {
  ssr: false,
  loading: () => <span className="loading loading-spinner" />,
});

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
