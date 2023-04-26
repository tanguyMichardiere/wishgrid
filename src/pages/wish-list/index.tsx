import { PlusIcon } from "@heroicons/react/24/outline";
import type { DehydratedState } from "@tanstack/react-query";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Session } from "next-auth";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import WishPreviewCard from "../../components/WishPreviewCard";
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
  await trpc.user.self.getWishList.prefetch();

  return { props: { session, trpcState: trpc.dehydrate() } };
}

export default function CreateWishPage(): JSX.Element {
  const wishList = trpc.user.self.getWishList.useQuery();

  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_TITLE} - Wish list`}</title>
      </Head>
      <Navbar title="Wish list" />
      <div className="mx-auto max-w-sm pb-20">
        {wishList.data !== undefined &&
          wishList.data.map((wish) => <WishPreviewCard key={wish.id} wish={wish} />)}
        <div className="tooltip fixed bottom-4 right-4" data-tip="New wish">
          <Link className="btn-square btn text-3xl" href="/wish-list/new">
            <PlusIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </>
  );
}
