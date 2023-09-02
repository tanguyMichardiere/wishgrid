import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import { createServerSideHelpers } from "../../utils/trpc/server";

export const runtime = "edge";

type Props = {
  children: ReactNode;
};

export default async function SignedInLayout(props: Props): Promise<JSX.Element> {
  const trpc = await createServerSideHelpers();

  try {
    await trpc.users.getCurrent.fetch();
  } catch {
    redirect("/sign-in/");
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto flex min-h-[calc(100%-72px)] max-w-sm flex-col pb-20">
        {props.children}
      </div>
    </>
  );
}
