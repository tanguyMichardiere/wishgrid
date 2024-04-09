import { notFound } from "next/navigation";
import "server-only";
import { serverQuery } from "..";

export const getUser = serverQuery((trpc, userId: string) => trpc.users.get.fetch({ userId }), {
	// biome-ignore lint/style/useNamingConvention: TRPC error code
	NOT_FOUND: notFound,
});
