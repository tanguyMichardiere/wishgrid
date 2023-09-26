import { cache } from "react";
import "server-only";
import { createServerSideHelpers } from "../../trpc/server";

async function fn() {
  const trpc = await createServerSideHelpers();

  return trpc.friendRequests.list.fetch();
}

export const getFriendRequestsList = cache(fn);
