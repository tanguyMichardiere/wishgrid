import type { DehydratedState } from "@tanstack/react-query";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Session } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
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
  const router = useRouter();

  const user = trpc.user.get.useQuery({ id: props.id });

  const context = trpc.useContext();
  const acceptFriendRequest = trpc.user.friend.request.accept.useMutation({
    async onSuccess(_, variables) {
      await context.user.friend.invalidate();
      await router.push(`/user/${variables.id}`);
    },
  });
  const refuseFriendRequest = trpc.user.friend.request.decline.useMutation({
    async onSuccess() {
      await context.user.friend.request.invalidate();
      await router.push("/friend-requests");
    },
  });

  const handleAccept = useCallback(
    function () {
      if (user.isSuccess) {
        acceptFriendRequest.mutate({ id: user.data.id });
      }
    },
    [user.isSuccess, acceptFriendRequest, user.data?.id]
  );
  const handleRefuse = useCallback(
    function () {
      if (user.isSuccess) {
        refuseFriendRequest.mutate({ id: user.data.id });
      }
    },
    [user.isSuccess, refuseFriendRequest, user.data?.id]
  );

  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_TITLE} - ${user.data?.name ?? props.id}`}</title>
      </Head>
      <Navbar backHref="/friend-requests" title="Friend request details" />
      <div className="mx-auto max-w-sm">
        {user.isSuccess ? (
          <div className="flex flex-col items-center gap-2">
            <Avatar user={user.data} />
            <h3 className="text-lg">{user.data.name}</h3>
            <p>requested to be friends with you</p>
            <div className="flex gap-4">
              <button
                className="btn-success btn"
                disabled={acceptFriendRequest.isLoading || refuseFriendRequest.isLoading}
                onClick={handleAccept}
                type="button"
              >
                {acceptFriendRequest.isLoading ? <Spinner /> : "Accept"}
              </button>
              <button
                className="btn-error btn"
                disabled={acceptFriendRequest.isLoading || refuseFriendRequest.isLoading}
                onClick={handleRefuse}
                type="button"
              >
                {refuseFriendRequest.isLoading ? <Spinner /> : "Refuse"}
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
