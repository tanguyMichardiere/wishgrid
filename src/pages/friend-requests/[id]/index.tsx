import type { DehydratedState } from "@tanstack/react-query";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Session } from "next-auth";
import Head from "next/head";
import { useCallback } from "react";
import { z } from "zod";
import Avatar from "../../../components/Avatar";
import Navbar from "../../../components/Navbar";
import Spinner from "../../../components/Spinner";
import { NEXT_PUBLIC_TITLE } from "../../../env.js";
import { createServerSideHelpers, getServerSession } from "../../../utils/serverSideHelpers";
import { trpc } from "../../../utils/trpc";

const Params = z.object({
  id: z.string().cuid(),
});

type Props = {
  session: Session;
  trpcState: DehydratedState;
  id: string;
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
  await trpc.user.get.prefetch({ id: params.data.id });

  return { props: { session, trpcState: trpc.dehydrate(), id: params.data.id } };
}

export default function FriendRequestDetailsPage(props: Props): JSX.Element {
  const user = trpc.user.get.useQuery({ id: props.id });

  const context = trpc.useContext();
  const accept = trpc.user.friend.request.accept.useMutation({
    async onSuccess() {
      await context.user.friend.invalidate();
    },
  });
  const refuse = trpc.user.friend.request.decline.useMutation({
    async onSuccess() {
      await context.user.friend.request.invalidate();
    },
  });

  const handleAccept = useCallback(
    function () {
      if (user.isSuccess) {
        accept.mutate({ id: user.data.id });
      }
    },
    [user.isSuccess, accept, user.data?.id]
  );
  const handleRefuse = useCallback(
    function () {
      if (user.isSuccess) {
        refuse.mutate({ id: user.data.id });
      }
    },
    [user.isSuccess, refuse, user.data?.id]
  );

  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_TITLE} - ${user.data?.name ?? props.id}`}</title>
      </Head>
      <Navbar backHref="/friend-requests" title="Friend request details" />
      <div className="mx-auto max-w-xl">
        {user.isSuccess ? (
          <div className="flex flex-col items-center gap-2">
            <Avatar user={user.data} />
            <h3 className="text-lg">{user.data.name}</h3>
            <p>requested to be friends with you</p>
            <div className="flex gap-4">
              <button className="btn-success btn" onClick={handleAccept} type="button">
                Accept
              </button>
              <button className="btn-error btn" onClick={handleRefuse} type="button">
                Refuse
              </button>
            </div>
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
