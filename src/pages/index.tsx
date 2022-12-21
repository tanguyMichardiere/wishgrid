import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

import { Tab } from "@headlessui/react";
import { Cog6ToothIcon, GiftIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import type { DehydratedState } from "@tanstack/react-query";
import type { Session } from "next-auth";

import DynamicLoadingSpinner from "../components/DynamicLoadingSpinner";

import { NEXT_PUBLIC_TITLE } from "../env/client";
import FollowsScreen from "../screens/Follows";
import { createProxySSGHelpers, getServerSession } from "../utils/ssgHelpers";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ session: Session; trpcState: DehydratedState }>> {
  const session = await getServerSession(context);
  if (session === null) {
    return { redirect: { destination: "/unauthenticated", permanent: false } };
  }

  const ssg = createProxySSGHelpers(context, session);
  await ssg.user.follow.list.prefetch();

  return { props: { session, trpcState: ssg.dehydrate() } };
}

const tabs = [
  {
    label: "Follows",
    Icon: GiftIcon,
    Component: FollowsScreen,
  },
  {
    label: "Profile",
    Icon: UserCircleIcon,
    Component: dynamic(() => import("../screens/Profile"), { loading: DynamicLoadingSpinner }),
  },
  {
    label: "Settings",
    Icon: Cog6ToothIcon,
    Component: dynamic(() => import("../screens/Settings"), { loading: DynamicLoadingSpinner }),
  },
];

export default function HomePage(): JSX.Element {
  return (
    <>
      <Head>
        <title>{NEXT_PUBLIC_TITLE}</title>
      </Head>
      <Tab.Group>
        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel className="mx-auto max-w-xl p-4" key={tab.label}>
              <tab.Component />
            </Tab.Panel>
          ))}
        </Tab.Panels>
        <Tab.List as="nav" className="fixed bottom-0 flex w-full justify-center p-1">
          {tabs.map((tab) => (
            <Tab
              className="flex w-full max-w-[12rem] flex-col items-center rounded-lg py-2 px-4 ui-selected:bg-black/20 ui-not-selected:hover:bg-black/10 dark:ui-selected:bg-white/20 dark:ui-not-selected:hover:bg-white/10"
              key={tab.label}
            >
              <tab.Icon className="h-6 w-6" />
              {tab.label}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </>
  );
}
