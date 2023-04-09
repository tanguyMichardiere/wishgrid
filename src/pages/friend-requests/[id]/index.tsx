import type { DehydratedState } from "@tanstack/react-query";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Session } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import { NEXT_PUBLIC_TITLE } from "../../../env.js";
import { createServerSideHelpers, getServerSession } from "../../../utils/serverSideHelpers";
import { trpc } from "../../../utils/trpc";

type Params = {
  id: string;
};

type Props = {
  session: Session;
  trpcState: DehydratedState;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext<Params>
): Promise<GetServerSidePropsResult<Props>> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { id } = context.params!;

  const session = await getServerSession(context);
  if (session === null) {
    return { redirect: { destination: "/unauthenticated", permanent: false } };
  }

  const trpc = createServerSideHelpers(context, session);
  await trpc.user.get.prefetch({ id });

  return { props: { session, trpcState: trpc.dehydrate() } };
}

export default function FriendRequestDetailsPage(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const { id } = useRouter().query as Params;

  const user = trpc.user.get.useQuery({ id });

  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_TITLE} - ${user.data?.name ?? id}`}</title>
      </Head>
      <Navbar backHref="/friend-requests" title="Friend request details" />
      <div className="mx-auto max-w-xl">TODO</div>
    </>
  );
}
