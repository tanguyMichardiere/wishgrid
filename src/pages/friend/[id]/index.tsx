import type { DehydratedState } from "@tanstack/react-query";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Session } from "next-auth";
import Head from "next/head";
import { z } from "zod";
import Avatar from "../../../components/Avatar";
import Navbar from "../../../components/Navbar";
import Spinner from "../../../components/Spinner";
import { NEXT_PUBLIC_TITLE } from "../../../env.js";
import { Id } from "../../../utils/fieldTypes";
import { createServerSideHelpers, getServerSession } from "../../../utils/serverSideHelpers";
import { trpc } from "../../../utils/trpc";

const Params = z.object({
  id: Id,
});

type Props = {
  session: Session;
  trpcState: DehydratedState;
  id: number;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const params = Params.safeParse(context.params);
  if (!params.success) {
    return { notFound: true };
  }

  const session = await getServerSession(context);
  if (session === null) {
    return { redirect: { destination: "/unauthenticated", permanent: false } };
  }

  const trpc = createServerSideHelpers(context, session);
  await trpc.user.friend.get.prefetch({ id: params.data.id });

  return { props: { session, trpcState: trpc.dehydrate(), id: params.data.id } };
}

export default function FriendDetailsPage(props: Props): JSX.Element {
  const user = trpc.user.friend.get.useQuery({ id: props.id });

  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_TITLE} - ${user.data?.name ?? props.id}`}</title>
      </Head>
      <Navbar backHref="/" title="Friend details" />
      <div className="mx-auto max-w-sm">
        {user.isSuccess ? (
          <div className="flex flex-col items-center gap-2">
            <Avatar size="large" user={user.data} />
            <h3 className="text-lg">{user.data.name}</h3>
          </div>
        ) : (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}