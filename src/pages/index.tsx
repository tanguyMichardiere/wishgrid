import type { DehydratedState } from "@tanstack/react-query";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Session } from "next-auth";
import Head from "next/head";
import FollowPreviewCard from "../components/FollowPreviewCard";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { NEXT_PUBLIC_TITLE } from "../env";
import { createServerSideHelpers, getServerSession } from "../utils/serverSideHelpers";
import { trpc } from "../utils/trpc";

type Props = {
  session: Session;
  trpcState: DehydratedState;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const session = await getServerSession(context);
  if (session === null) {
    return { redirect: { destination: "/unauthenticated", permanent: false } };
  }

  const trpc = createServerSideHelpers(context, session);
  await trpc.user.friend.list.prefetch();

  return { props: { session, trpcState: trpc.dehydrate() } };
}

export default function HomePage(props: Props): JSX.Element {
  const friends = trpc.user.friend.list.useQuery();

  return (
    <>
      <Head>
        <title>{NEXT_PUBLIC_TITLE}</title>
      </Head>
      <Navbar session={props.session} />
      <div className="mx-auto max-w-xl p-4 pb-20">
        {friends.data !== undefined ? (
          <ul className="flex flex-col gap-2">
            {friends.data.map((user) => (
              <li key={user.id}>
                <FollowPreviewCard user={user} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
