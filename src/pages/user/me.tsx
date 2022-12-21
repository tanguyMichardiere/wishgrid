import { useCallback } from "react";

import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";

import type { Session } from "next-auth";
import { signOut as _signOut, useSession } from "next-auth/react";

import Spinner from "../../components/Spinner";
import TopBar from "../../components/TopBar";

import { NEXT_PUBLIC_TITLE } from "../../env/client";
import { getServerSession } from "../../utils/ssgHelpers";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ session: Session }>> {
  const session = await getServerSession(context);
  if (session === null) {
    return { redirect: { destination: "/unauthenticated", permanent: false } };
  }

  return { props: { session } };
}

export default function UserMePage(): JSX.Element {
  const session = useSession({ required: true });

  const signOut = useCallback(async function () {
    await _signOut();
  }, []);

  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_TITLE} - Me`}</title>
      </Head>
      <TopBar />
      <div className="flex justify-center">
        {session.data !== null ? (
          <div className="flex flex-col gap-2">
            <div>
              Signed in as{" "}
              {session.data.user.name ?? session.data.user.email ?? session.data.user.id}
            </div>
            <button onClick={signOut} type="button">
              Sign out
            </button>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}
