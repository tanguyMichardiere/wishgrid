import type { User } from "@clerk/nextjs/dist/types/server";
import { and, eq, or, sql } from "drizzle-orm";
import "server-only";
import { db } from "../db";
import { friendRequests } from "../db/schema/friendRequests";
import { getCurrentUser, getUsers } from "./users";

export async function getFriendRequests(): Promise<Array<User>> {
  const currentUser = await getCurrentUser();

  const rows = await db
    .select({ id: friendRequests.userId })
    .from(friendRequests)
    .where(eq(friendRequests.friendId, currentUser.id));

  return getUsers(rows.map((row) => row.id));
}

export async function getFriendRequestsCount(): Promise<number> {
  const currentUser = await getCurrentUser();

  const rows = await db
    .select({ count: sql<number>`count(*)` })
    .from(friendRequests)
    .where(eq(friendRequests.friendId, currentUser.id));
  // count will always return exactly one row
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return rows[0]!.count;
}

export async function getFriendRequestsStatus(
  userId: string,
): Promise<{ from: boolean; to: boolean }> {
  const currentUser = await getCurrentUser();

  const rows = await db
    .select({ userId: friendRequests.userId })
    .from(friendRequests)
    .where(
      or(
        and(eq(friendRequests.userId, currentUser.id), eq(friendRequests.friendId, userId)),
        and(eq(friendRequests.userId, userId), eq(friendRequests.friendId, currentUser.id)),
      ),
    );
  const userIds = rows.map((row) => row.userId);

  return { from: userIds.includes(userId), to: userIds.includes(currentUser.id) };
}
