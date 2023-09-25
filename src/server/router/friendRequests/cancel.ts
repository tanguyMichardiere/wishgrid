import { and, eq } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { friendRequests } from "../../db/schema/friendRequests";
import { UserId } from "../../db/types/user";
import { httpDb } from "../../middleware/httpDb";

export const cancel = procedure
  .use(httpDb)
  .input(z.object({ userId: UserId }))
  .output(z.void())
  .mutation(async function ({ ctx, input }) {
    await ctx.db
      .delete(friendRequests)
      .where(
        and(eq(friendRequests.userId, ctx.user.id), eq(friendRequests.friendId, input.userId)),
      );
  });
