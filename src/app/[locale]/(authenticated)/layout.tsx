import type { JSX, ReactNode } from "react";
import Navbar from "../../../components/Navbar";
import CurrentUserContextProvider from "../../../context/currentUser/provider";
import { getCurrentUser } from "../../../utils/serverQueries/users/getCurrent";

type Props = {
  children: ReactNode;
};

export default async function SignedInLayout(props: Props): Promise<JSX.Element> {
  const currentUser = await getCurrentUser();

  return (
    <CurrentUserContextProvider initialCurrentUser={currentUser}>
      <Navbar />
      <div className="mx-auto flex max-w-sm flex-col pb-20">{props.children}</div>
    </CurrentUserContextProvider>
  );
}
