import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import type { DehydratedState } from "@tanstack/react-query";
import type { Session } from "next-auth";

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
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const ssg = createProxySSGHelpers(context, session);
  await ssg.user.get.prefetch({ id });

  return { props: { session, trpcState: ssg.dehydrate() } };
}

export default function Page(
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const { id } = useRouter().query as Params;

  const user = trpc.user.get.useQuery({ id });

  return (
    <Head>
      <title>{`${NEXT_PUBLIC_TITLE}${
        user.data !== undefined ? ` - ${user.data.name ?? user.data.id}` : ""
      }`}</title>
    </Head>
  );
}
