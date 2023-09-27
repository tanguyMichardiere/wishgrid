import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { and, eq, sql } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { friends } from "../../db/schema/friends";
import { User, UserId } from "../../db/types/user";
import { httpDb } from "../../middleware/httpDb";

export const get = procedure
  .use(httpDb)
  .input(z.object({ userId: UserId }))
  .output(User)
  .query(async function ({ ctx, input }) {
    const rows = await ctx.db
      .select({ count: sql<string>`count(*)` })
      .from(friends)
      .where(and(eq(friends.userId, ctx.user.id), eq(friends.friendId, input.userId)));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const count = parseInt(rows[0]!.count);
    if (count === 0) {
      ctx.logger.info(
        { currentUserId: ctx.user.id, userId: input.userId },
        `users ${ctx.user.id} and ${input.userId} are not friends`,
      );
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    return clerkClient.users.getUser(input.userId);
  });
