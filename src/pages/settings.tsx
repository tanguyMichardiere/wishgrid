import { useCallback } from "react";

import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";

import type { Session } from "next-auth";
import { signOut as _signOut } from "next-auth/react";

import NavBar from "../components/NavBar";
import Separator from "../components/Separator";
import ThemeMenu from "../components/ThemeMenu";

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
  const signOut = useCallback(async function () {
    await _signOut();
  }, []);

  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_TITLE} - Settings`}</title>
      </Head>
      <div className="mx-auto flex max-w-xl flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <p>Theme</p>
          <ThemeMenu />
        </div>
        <Separator />
        <button className="btn" onClick={signOut} type="button">
          Disconnect
        </button>
      </div>
      <NavBar />
    </>
  );
}
