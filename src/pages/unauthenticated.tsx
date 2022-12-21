import { useCallback } from "react";

import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";

import { signIn as _signIn } from "next-auth/react";

import { NEXT_PUBLIC_TITLE } from "../env/client";
import { getServerSession } from "../utils/ssgHelpers";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ session: null }>> {
  const session = await getServerSession(context);
  if (session !== null) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: { session } };
}

export default function UnauthenticatedPage(): JSX.Element {
  const signIn = useCallback(async function () {
    await _signIn();
  }, []);

  return (
    <>
      <Head>
        <title>{NEXT_PUBLIC_TITLE} - Unauthenticated</title>
      </Head>
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="text-5xl font-bold">{NEXT_PUBLIC_TITLE}</h1>
        <button onClick={signIn} type="button">
          Sign in
        </button>
      </div>
    </>
  );
}
