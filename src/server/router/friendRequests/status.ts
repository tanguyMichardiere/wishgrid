import { and, eq, or } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { friendRequests } from "../../db/schema/friendRequests";
import { UserId } from "../../db/types/user";
import { httpDb } from "../../middleware/httpDb";

export const status = procedure
  .use(httpDb)
  .input(z.object({ userId: UserId }))
  .output(z.object({ from: z.boolean(), to: z.boolean() }))
  .query(async function ({ ctx, input }) {
    const rows = await ctx.db.query.friendRequests.findMany({
      columns: { userId: true },
      where: or(
        and(eq(friendRequests.userId, ctx.user.id), eq(friendRequests.friendId, input.userId)),
        and(eq(friendRequests.userId, input.userId), eq(friendRequests.friendId, ctx.user.id)),
      ),
    });
    const userIds = rows.map((row) => row.userId);

    return { from: userIds.includes(input.userId), to: userIds.includes(ctx.user.id) };
  });
