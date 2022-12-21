import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";

import type { DehydratedState } from "@tanstack/react-query";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";

import FollowPreviewCard from "../components/FollowPreviewCard";
import SelfPreviewCard from "../components/SelfPreviewCard";
import Spinner from "../components/Spinner";
import TopBar from "../components/TopBar";

import { NEXT_PUBLIC_TITLE } from "../env/client";
import { createProxySSGHelpers, getServerSession } from "../utils/ssgHelpers";
import { trpc } from "../utils/trpc";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ session: Session; trpcState: DehydratedState }>> {
  const session = await getServerSession(context);
  if (session === null) {
    return { redirect: { destination: "/unauthenticated", permanent: false } };
  }

  const ssg = createProxySSGHelpers(context, session);
  await ssg.user.follow.listFollows.prefetch();

  return { props: { session, trpcState: ssg.dehydrate() } };
}

export default function HomePage(): JSX.Element {
  const session = useSession({ required: true });
  const follows = trpc.user.follow.listFollows.useQuery();

  return (
    <>
      <Head>
        <title>{NEXT_PUBLIC_TITLE}</title>
      </Head>
      <TopBar />
      <ul className="grid grid-cols-1 grid-rows-2 p-2 text-xl">
        <li>
          {session.data !== null ? <SelfPreviewCard user={session.data.user} /> : <Spinner />}
        </li>
        {follows.data !== undefined ? (
          follows.data.map((user) => (
            <li key={user.id}>
              <FollowPreviewCard user={user} />
            </li>
          ))
        ) : (
          <Spinner />
        )}
      </ul>
    </>
  );
}
