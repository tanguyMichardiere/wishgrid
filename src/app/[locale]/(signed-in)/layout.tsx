import { redirect } from "next-intl/server";
import type { ReactNode } from "react";
import Navbar from "../../../components/Navbar";
import CurrentUserContextProvider from "../../../context/currentUser/provider";
import type { User } from "../../../server/db/types/user";
import { createServerSideHelpers } from "../../../utils/trpc/server";

export const runtime = "nodejs";

type Props = {
  children: ReactNode;
};

export default async function SignedInLayout(props: Props): Promise<JSX.Element> {
  const trpc = await createServerSideHelpers();

  let currentUser: User;
  try {
    currentUser = await trpc.users.getCurrent.fetch();
  } catch {
    redirect("/sign-in");
  }

  return (
    <CurrentUserContextProvider initialCurrentUser={currentUser}>
      <Navbar />
      <div className="mx-auto flex min-h-[calc(100%-72px)] max-w-sm flex-col pb-20">
        {props.children}
      </div>
    </CurrentUserContextProvider>
  );
}
