import { eq, sql } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { friendRequests } from "../../db/schema/friendRequests";
import { httpDb } from "../../middleware/httpDb";

export const count = procedure
  .use(httpDb)
  .output(z.number().int().nonnegative())
  .query(async function ({ ctx }) {
    const rows = await ctx.db
      .select({ count: sql<string>`count(*)` })
      .from(friendRequests)
      .where(eq(friendRequests.friendId, ctx.user.id));
    // count will always return exactly one row
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return parseInt(rows[0]!.count);
  });
