import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { friendRequests } from "../../db/schema/friendRequests";
import { friends } from "../../db/schema/friends";
import { UserId } from "../../db/types/user";
import { serverlessDb } from "../../middleware/serverlessDb";

export const accept = procedure
  .use(serverlessDb)
  .input(z.object({ userId: UserId }))
  .output(z.void())
  .mutation(async function ({ ctx, input }) {
    const rows = await ctx.db
      .delete(friendRequests)
      .where(and(eq(friendRequests.userId, input.userId), eq(friendRequests.friendId, ctx.user.id)))
      .returning();
    if (rows.length === 0) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    await ctx.db
      .delete(friendRequests)
      .where(
        and(eq(friendRequests.userId, input.userId), eq(friendRequests.friendId, ctx.user.id)),
      );
    await ctx.db.insert(friends).values([
      { userId: ctx.user.id, friendId: input.userId },
      { userId: input.userId, friendId: ctx.user.id },
    ]);
  });
