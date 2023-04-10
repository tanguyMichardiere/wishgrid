import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Session } from "next-auth";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { NEXT_PUBLIC_TITLE } from "../../env";
import { getServerSession } from "../../utils/serverSideHelpers";

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

export default function ProfilePage(): JSX.Element {
  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_TITLE} - Profile`}</title>
      </Head>
      <Navbar title="Profile" />
      <div className="mx-auto max-w-sm">TODO</div>
    </>
  );
}
