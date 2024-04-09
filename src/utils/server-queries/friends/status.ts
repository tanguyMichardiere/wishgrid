import { notFound } from "next/navigation";
import "server-only";
import { serverQuery } from "..";

export const getFriendsStatus = serverQuery(
	(trpc, userId: string) => trpc.friends.status.fetch({ userId }),
	// biome-ignore lint/style/useNamingConvention: TRPC error code
	{ NOT_FOUND: notFound },
);
