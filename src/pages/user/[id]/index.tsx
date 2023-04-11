import { CheckIcon } from "@heroicons/react/24/outline";
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
  const user = await trpc.user.get.fetch({ id: params.data.id });
  if (user.friend) {
    return { redirect: { destination: `/friend/${params.data.id}`, permanent: false } };
  }

  return { props: { session, trpcState: trpc.dehydrate(), id: params.data.id } };
}

export default function UserDetailsPage(props: Props): JSX.Element {
  const user = trpc.user.get.useQuery({ id: props.id });

  const createFriendRequest = trpc.user.friend.request.create.useMutation();
  const cancelFriendRequest = trpc.user.friend.request.cancel.useMutation();

  const handleCreateFriendRequest = useCallback(
    function () {
      if (user.isSuccess) {
        createFriendRequest.mutate({ id: user.data.id });
      }
    },
    [user.isSuccess, createFriendRequest, user.data?.id]
  );
  const handleCancelFriendRequest = useCallback(
    function () {
      if (user.isSuccess) {
        cancelFriendRequest.mutate({ id: user.data.id });
      }
    },
    [user.isSuccess, cancelFriendRequest, user.data?.id]
  );

  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_TITLE} - ${user.data?.name ?? props.id}`}</title>
      </Head>
      <Navbar backHref="/search" title="User details" />
      <div className="mx-auto max-w-sm">
        {user.isSuccess ? (
          <div className="flex flex-col items-center gap-2">
            <Avatar size="large" user={user.data} />
            <h3 className="text-lg">{user.data.name}</h3>
            {user.data.friendRequest ? (
              <>
                <p className="text-center">
                  You have already requested to be friends with {user.data.name}
                </p>
                {cancelFriendRequest.isSuccess ? (
                  <div className="flex gap-2">
                    <CheckIcon className="h-6 w-6" />
                    Friend request cancelled
                  </div>
                ) : (
                  <button
                    className="btn"
                    disabled={cancelFriendRequest.isLoading}
                    onClick={handleCancelFriendRequest}
                    type="button"
                  >
                    {cancelFriendRequest.isLoading ? <Spinner /> : "Cancel"}
                  </button>
                )}
              </>
            ) : createFriendRequest.isSuccess ? (
              <div className="flex gap-2">
                <CheckIcon className="h-6 w-6" />
                Friend request sent
              </div>
            ) : (
              <button
                className="btn"
                disabled={createFriendRequest.isLoading}
                onClick={handleCreateFriendRequest}
                type="button"
              >
                {createFriendRequest.isLoading ? <Spinner /> : "Friend request"}
              </button>
            )}
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
