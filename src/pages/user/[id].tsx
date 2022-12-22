import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { DehydratedState } from "@tanstack/react-query";
import type { Session } from "next-auth";

import NavBar from "../../components/NavBar";

import { NEXT_PUBLIC_TITLE } from "../../env/client";
import { createProxySSGHelpers, getServerSession } from "../../utils/ssgHelpers";
import { trpc } from "../../utils/trpc";

type Params = {
  id: string;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext<Params>
): Promise<GetServerSidePropsResult<{ session: Session; trpcState: DehydratedState }>> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { id } = context.params!;

  const session = await getServerSession(context);
  if (session === null) {
    return { redirect: { destination: "/unauthenticated", permanent: false } };
  }

  const ssg = createProxySSGHelpers(context, session);
  await ssg.user.get.prefetch({ id });

  return { props: { session, trpcState: ssg.dehydrate() } };
}

export default function UserIdPage(): JSX.Element {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const { id } = router.query as Params;

  const user = trpc.user.get.useQuery({ id });

  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_TITLE} - ${user.data?.name ?? id}`}</title>
      </Head>
      <div className="mx-auto flex max-w-xl flex-col gap-4 p-4">
        <button className="w-fit p-2" onClick={router.back} title="back" type="button">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        TODO
      </div>
      <NavBar />
    </>
  );
}
