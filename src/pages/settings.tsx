import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";

import type { Session } from "next-auth";

import ThemeChanger from "../components/ThemeChanger";
import TopBar from "../components/TopBar";

import { NEXT_PUBLIC_TITLE } from "../env/client";
import { getServerSession } from "../utils/ssgHelpers";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ session: Session }>> {
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
        <title>{NEXT_PUBLIC_TITLE} - Settings</title>
      </Head>
      <TopBar />
      <div className="flex flex-col gap-2 p-4">
        <ThemeChanger />
      </div>
    </>
  );
}
