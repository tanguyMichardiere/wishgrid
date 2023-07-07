"use server";

import { and, eq, or } from "drizzle-orm";
import { db } from "../../db";
import { friendRequests } from "../../db/schema/friendRequests";
import { friends } from "../../db/schema/friends";
import { getCurrentUser } from "../users";
import { FriendRequestNotFoundError } from "./errors";

export async function createFriendRequest(userId: string): Promise<void> {
  const currentUser = await getCurrentUser();

  await db.insert(friendRequests).values({ userId: currentUser.id, friendId: userId });
}

export async function cancelFriendRequest(userId: string): Promise<void> {
  const currentUser = await getCurrentUser();

  await db
    .delete(friendRequests)
    .where(and(eq(friendRequests.userId, currentUser.id), eq(friendRequests.friendId, userId)));
}

export async function acceptFriendRequest(userId: string): Promise<void> {
  const currentUser = await getCurrentUser();

  await db.transaction(async function (tx) {
    const rows = await tx
      .delete(friendRequests)
      .where(and(eq(friendRequests.userId, userId), eq(friendRequests.friendId, currentUser.id)))
      .returning();
    if (rows.length === 0) {
      throw new FriendRequestNotFoundError();
    }
    await tx
      .delete(friendRequests)
      .where(and(eq(friendRequests.userId, userId), eq(friendRequests.friendId, currentUser.id)));
    await tx.insert(friends).values([
      { userId: currentUser.id, friendId: userId },
      { userId, friendId: currentUser.id },
    ]);
  });
}

export async function declineFriendRequest(userId: string): Promise<void> {
  const currentUser = await getCurrentUser();

  await db
    .delete(friendRequests)
    .where(
      or(
        and(eq(friendRequests.userId, userId), eq(friendRequests.friendId, currentUser.id)),
        and(eq(friendRequests.userId, userId), eq(friendRequests.friendId, currentUser.id))
      )
    );
}
