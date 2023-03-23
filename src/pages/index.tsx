import type { DehydratedState } from "@tanstack/react-query";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Session } from "next-auth";
import Head from "next/head";
import FollowPreviewCard from "../components/FollowPreviewCard";
import NavBar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { NEXT_PUBLIC_TITLE } from "../env";
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
  await ssg.user.friend.list.prefetch();

  return { props: { session, trpcState: ssg.dehydrate() } };
}

export default function HomePage(): JSX.Element {
  const friends = trpc.user.friend.list.useQuery();

  return (
    <>
      <Head>
        <title>{NEXT_PUBLIC_TITLE}</title>
      </Head>
      <div className="mx-auto  max-w-xl p-4 pb-20">
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
      <NavBar />
    </>
  );
}
