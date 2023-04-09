import type { DehydratedState } from "@tanstack/react-query";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Session } from "next-auth";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Spinner from "../../components/Spinner";
import UserPreviewCard from "../../components/UserPreviewCard";
import { NEXT_PUBLIC_TITLE } from "../../env";
import { createServerSideHelpers, getServerSession } from "../../utils/serverSideHelpers";
import { trpc } from "../../utils/trpc";

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
  await trpc.user.friend.request.list.prefetch();

  return { props: { session, trpcState: trpc.dehydrate() } };
}

export default function FriendRequestsPage(): JSX.Element {
  const friendRequests = trpc.user.friend.request.list.useQuery();

  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_TITLE} - Friend requests`}</title>
      </Head>
      <Navbar />
      <div className="mx-auto max-w-xl p-4 pb-20">
        {friendRequests.data !== undefined ? (
          <ul className="flex flex-col gap-2">
            {friendRequests.data.map((user) => (
              <li key={user.id}>
                <UserPreviewCard user={user} />
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
