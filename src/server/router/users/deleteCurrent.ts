import { clerkClient } from "@clerk/nextjs";
import { eq, or } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { comments } from "../../db/schema/comments";
import { friendRequests } from "../../db/schema/friendRequests";
import { friends } from "../../db/schema/friends";
import { wishViews } from "../../db/schema/wishViews";
import { wishes } from "../../db/schema/wishes";
import { serverlessDb } from "../../middleware/serverlessDb";

export const deleteCurrent = procedure
  .use(serverlessDb)
  .output(z.void())
  .mutation(async function ({ ctx }) {
    await Promise.all([
      ctx.db.delete(wishes).where(eq(wishes.userId, ctx.user.id)),
      ctx.db.update(wishes).set({ reservedById: null }).where(eq(wishes.reservedById, ctx.user.id)),
      ctx.db
        .delete(friends)
        .where(or(eq(friends.userId, ctx.user.id), eq(friends.friendId, ctx.user.id))),
      ctx.db
        .delete(friendRequests)
        .where(
          or(eq(friendRequests.userId, ctx.user.id), eq(friendRequests.friendId, ctx.user.id)),
        ),
      ctx.db.delete(wishViews).where(eq(wishViews.userId, ctx.user.id)),
      // TODO: anonymize comments instead?
      ctx.db.delete(comments).where(eq(comments.userId, ctx.user.id)),
    ]);

    await clerkClient.users.deleteUser(ctx.user.id);
  });
