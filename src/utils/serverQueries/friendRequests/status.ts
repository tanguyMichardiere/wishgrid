import { notFound } from "next/navigation";
import "server-only";
import { serverQuery } from "..";

export const getFriendRequestsStatus = serverQuery(
  (trpc, userId: string) => trpc.friendRequests.status.fetch({ userId }),
  { NOT_FOUND: notFound },
);
