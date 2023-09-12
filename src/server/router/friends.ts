import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { and, eq, or, sql } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { createRouter, procedure } from "..";
import { friends } from "../db/schema/friends";
import { User, UserId } from "../db/types/user";
import { httpDb } from "../middleware/httpDb";
import { getUsers } from "./users";

export const friendsRouter = createRouter({
  list: procedure
    .use(httpDb)
    .output(z.array(User))
    .query(async function ({ ctx }) {
      const friendIds = await ctx.db.query.friends.findMany({
        columns: { friendId: true },
        where: eq(friends.userId, ctx.user.id),
      });

      return getUsers(
        friendIds.map((row) => row.friendId),
        ctx,
      );
    }),

  get: procedure
    .use(httpDb)
    .input(z.object({ userId: UserId }))
    .output(User)
    .query(async function ({ ctx, input }) {
      const rows = await ctx.db
        .select({ count: sql<string>`count(*)` })
        .from(friends)
        .where(and(eq(friends.userId, ctx.user.id), eq(friends.friendId, input.userId)));
      // count will always return exactly one row
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const count = parseInt(rows[0]!.count);
      if (count === 0) {
        ctx.log.info(`users ${ctx.user.id} and ${input.userId} are not friends`, {
          currentUserId: ctx.user.id,
          userId: input.userId,
        });
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return clerkClient.users.getUser(input.userId);
    }),

  status: procedure
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
      // count will always return exactly one row
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const count = parseInt(rows[0]!.count);

      return count === 2;
    }),
});
