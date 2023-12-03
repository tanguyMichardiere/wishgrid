import { notFound } from "next/navigation";
import "server-only";
import { serverQuery } from "..";

export const getUser = serverQuery((trpc, userId: string) => trpc.users.get.fetch({ userId }), {
  NOT_FOUND: notFound,
});
