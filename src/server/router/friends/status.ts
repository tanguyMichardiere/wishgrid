import { and, eq, or, sql } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { friends } from "../../db/schema/friends";
import { UserId } from "../../db/types/user";
import { httpDb } from "../../middleware/httpDb";

export const status = procedure
  .use(httpDb)
  .input(z.object({ userId: UserId }))
  .output(z.boolean())
  .query(async function ({ ctx, input }) {
    const rows = await ctx.db
      .select({ count: sql<string>`count(*)` })
      .from(friends)
      .where(
        or(
          and(eq(friends.userId, ctx.user.id), eq(friends.friendId, input.userId)),
          and(eq(friends.userId, input.userId), eq(friends.friendId, ctx.user.id)),
        ),
      );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const count = parseInt(rows[0]!.count);

    return count === 2;
  });
