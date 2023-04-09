import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { signIn as _signIn } from "next-auth/react";
import Head from "next/head";
import { useCallback } from "react";
import { NEXT_PUBLIC_TITLE } from "../../env";
import { getServerSession } from "../../utils/serverSideHelpers";

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
        <title>{`${NEXT_PUBLIC_TITLE} - Unauthenticated`}</title>
      </Head>
      <div className="flex flex-col items-center gap-4 pt-24">
        <h1 className="text-5xl font-bold">{NEXT_PUBLIC_TITLE}</h1>
        <button className="btn-primary btn" onClick={signIn} type="button">
          Sign in
        </button>
      </div>
    </>
  );
}