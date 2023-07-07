import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/types/server";
import { and, eq, or, sql } from "drizzle-orm";
import { log } from "next-axiom";
import "server-only";
import { db } from "../db";
import { friends } from "../db/schema/friends";
import { UserNotFriendError } from "./errors";
import { getCurrentUser, getUsers } from "./users";

export async function getFriends(): Promise<Array<User>> {
  const currentUser = await getCurrentUser();

  const friendIds = await db
    .select({ id: friends.friendId })
    .from(friends)
    .where(eq(friends.userId, currentUser.id));

  return getUsers(friendIds.map((row) => row.id));
}

export async function getFriend(userId: string): Promise<User> {
  const currentUser = await getCurrentUser();

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

export async function getFriendsStatus(userId: string): Promise<boolean> {
  const currentUser = await getCurrentUser();

  const rows = await db
    .select({})
    .from(friends)
    .where(
      or(
        and(eq(friends.userId, currentUser.id), eq(friends.friendId, userId)),
        and(eq(friends.userId, userId), eq(friends.friendId, currentUser.id))
      )
    );

  return rows.length === 2;
}
