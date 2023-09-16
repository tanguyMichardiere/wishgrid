import { createServerSideHelpers } from "../../utils/trpc/server";
import NewWishButtonContent from "./content";

export default async function NewWishButton(): Promise<JSX.Element> {
  const trpc = await createServerSideHelpers();

  const currentUser = await trpc.users.getCurrent.fetch();

  return <NewWishButtonContent initialCurrentUser={currentUser} />;
}
