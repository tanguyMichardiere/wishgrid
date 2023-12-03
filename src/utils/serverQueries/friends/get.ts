import { notFound } from "next/navigation";
import "server-only";
import { serverQuery } from "..";

export const getFriend = serverQuery((trpc, userId: string) => trpc.friends.get.fetch({ userId }), {
  NOT_FOUND: notFound,
});
