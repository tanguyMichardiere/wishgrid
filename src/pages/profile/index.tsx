import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";

import type { Session } from "next-auth";

import NavBar from "../../components/NavBar";

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

export default function ProfilePage(): JSX.Element {
  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_TITLE} - Profile`}</title>
      </Head>
      <div className="mx-auto max-w-xl p-4">TODO</div>
      <NavBar />
    </>
  );
}
