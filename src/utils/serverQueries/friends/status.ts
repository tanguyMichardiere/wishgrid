import { notFound } from "next/navigation";
import "server-only";
import { serverQuery } from "..";

export const getFriendsStatus = serverQuery(
  (trpc, userId: string) => trpc.friends.status.fetch({ userId }),
  { NOT_FOUND: notFound },
);
