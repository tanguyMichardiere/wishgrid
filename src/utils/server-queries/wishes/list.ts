import { notFound } from "next/navigation";
import "server-only";
import { serverQuery } from "..";

export const getWishesList = serverQuery(
	(trpc, userId: string) => trpc.wishes.list.fetch({ userId }),
	// biome-ignore lint/style/useNamingConvention: TRPC error code
	{ NOT_FOUND: notFound },
);
