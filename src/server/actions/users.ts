"use server";

import { clerkClient } from "@clerk/nextjs";
import { eq, or } from "drizzle-orm";
import { db } from "../../db";
import { comments } from "../../db/schema/comments";
import { friendRequests } from "../../db/schema/friendRequests";
import { friends } from "../../db/schema/friends";
import { wishes } from "../../db/schema/wishes";
import { getCurrentUser } from "../users";

export async function deleteCurrentUser(): Promise<void> {
  const currentUser = await getCurrentUser();

  await Promise.all([
    db.delete(wishes).where(eq(wishes.userId, currentUser.id)),
    db.update(wishes).set({ reservedById: null }).where(eq(wishes.reservedById, currentUser.id)),
    db
      .delete(friends)
      .where(or(eq(friends.userId, currentUser.id), eq(friends.friendId, currentUser.id))),
    db
      .delete(friendRequests)
      .where(
        or(eq(friendRequests.userId, currentUser.id), eq(friendRequests.friendId, currentUser.id))
      ),
    // TODO: anonymize comments instead?
    db.delete(comments).where(eq(comments.userId, currentUser.id)),
  ]);

  await clerkClient.users.deleteUser(currentUser.id);
}
