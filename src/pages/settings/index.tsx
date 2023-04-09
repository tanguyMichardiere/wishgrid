import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Session } from "next-auth";
import dynamic from "next/dynamic";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { NEXT_PUBLIC_TITLE } from "../../env";
import { getServerSession } from "../../utils/serverSideHelpers";

const ThemeMenu = dynamic(() => import("../../components/ThemeMenu"), { ssr: false });

type Props = {
  session: Session;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const session = await getServerSession(context);
  if (session === null) {
    return { redirect: { destination: "/unauthenticated", permanent: false } };
  }

  return { props: { session } };
}

export default function SettingsPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_TITLE} - Settings`}</title>
      </Head>
      <Navbar />
      <div className="mx-auto flex max-w-xl flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <p>Theme</p>
          <ThemeMenu />
        </div>
      </div>
    </>
  );
}
