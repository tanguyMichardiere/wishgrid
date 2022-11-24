import { useCallback } from "react";

import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";

import type { Session } from "next-auth";
import { signIn as _signIn, signOut as _signOut, useSession } from "next-auth/react";

import Spinner from "../components/Spinner";
import ThemeMenu from "../components/ThemeMenu";

import { getServerSession } from "../utils/ssgHelpers";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ session: Session | null }>> {
  const session = await getServerSession(context);
  return { props: { session } };
}

export default function Page(): JSX.Element {
  const session = useSession();

  const signIn = useCallback(async function () {
    await _signIn();
  }, []);

  const signOut = useCallback(async function () {
    await _signOut();
  }, []);

  return (
    <>
      <Head>
        <title>Wisher</title>
      </Head>
      <div className="fixed top-4 right-4">
        <ThemeMenu />
      </div>
      <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
        <h1 className="text-5xl font-bold">Wisher</h1>
        {session.status === "loading" ? (
          <Spinner />
        ) : session.data === null ? (
          <button onClick={signIn} type="button">
            Sign in
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <div>Signed in as {session.data.user.email}</div>
            <button onClick={signOut} type="button">
              Sign out
            </button>
          </div>
        )}
      </div>
    </>
  );
}
