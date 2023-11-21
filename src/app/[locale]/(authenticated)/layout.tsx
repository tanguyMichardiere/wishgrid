import type { ReactNode } from "react";
import Navbar from "../../../components/Navbar";
import CurrentUserContextProvider from "../../../context/currentUser/provider";
import { logger } from "../../../server/logger";
import { getCurrentUser } from "../../../utils/serverQueries/users/getCurrent";

type Props = {
  children: ReactNode;
};

export default async function SignedInLayout(props: Props): Promise<JSX.Element> {
  const currentUser = await getCurrentUser();
  logger.warn(JSON.stringify(currentUser));

  return (
    <CurrentUserContextProvider initialCurrentUser={currentUser}>
      <Navbar />
      <div className="mx-auto flex max-w-sm flex-col pb-20">{props.children}</div>
    </CurrentUserContextProvider>
  );
}
