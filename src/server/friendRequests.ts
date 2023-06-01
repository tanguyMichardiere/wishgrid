import { eq, sql } from "drizzle-orm";
import { log } from "next-axiom";
import "server-only";
import { db } from "../db";
import { friendRequests } from "../db/schema/friendRequests";
import { getCurrentUser } from "./users";

export async function getFriendRequestsCount(): Promise<number> {
  const currentUser = await getCurrentUser();

  log.debug(`counting friend requests for ${currentUser.id}`, { currentUserId: currentUser.id });
  const rows = await db
    .select({ count: sql<number>`count(*)` })
    .from(friendRequests)
    .where(eq(friendRequests.friendId, currentUser.id));
  // count will always return exactly one row
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return rows[0]!.count;
}
