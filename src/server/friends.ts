import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/types/server";
import { and, eq, sql } from "drizzle-orm";
import { log } from "next-axiom";
import "server-only";
import { db } from "../db";
import { friends } from "../db/schema/friends";
import { getCurrentUser, getUsers } from "./users";

export async function getFriends(): Promise<Array<User>> {
  const currentUser = await getCurrentUser();

  log.debug(`retrieving IDs of friends of ${currentUser.id}`, { currentUserId: currentUser.id });
  const friendIds = await db
    .select({ id: friends.friendId })
    .from(friends)
    .where(eq(friends.userId, currentUser.id));
  log.debug(`found ${friendIds.length} IDs`);

  return getUsers(friendIds.map((row) => row.id));
}

export class UserNotFriendError extends Error {}

export async function getFriend(userId: string): Promise<User> {
  const currentUser = await getCurrentUser();

  log.debug(`checking that users ${currentUser.id} and ${userId} are friends`, {
    currentUserId: currentUser.id,
    userId,
  });
  const rows = await db
    .select({ count: sql<number>`count(*)` })
    .from(friends)
    .where(and(eq(friends.userId, currentUser.id), eq(friends.friendId, userId)));
  // count will always return exactly one row
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const count = rows[0]!.count;
  if (count === 0) {
    log.info(`users ${currentUser.id} and ${userId} are not friends`, {
      currentUserId: currentUser.id,
      userId,
    });
    throw new UserNotFriendError();
  }

  return clerkClient.users.getUser(userId);
}
