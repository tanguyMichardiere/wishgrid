import { and, eq, or } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { friendRequests } from "../../db/schema/friendRequests";
import { UserId } from "../../db/types/user";
import { httpDb } from "../../middleware/httpDb";

export const decline = procedure
  .use(httpDb)
  .input(z.object({ userId: UserId }))
  .output(z.void())
  .mutation(async function ({ ctx, input }) {
    await ctx.db
      .delete(friendRequests)
      .where(
        or(
          and(eq(friendRequests.userId, input.userId), eq(friendRequests.friendId, ctx.user.id)),
          and(eq(friendRequests.userId, input.userId), eq(friendRequests.friendId, ctx.user.id)),
        ),
      );
  });
