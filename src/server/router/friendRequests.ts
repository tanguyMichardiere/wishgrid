import { TRPCError } from "@trpc/server";
import { and, eq, or, sql } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { createRouter, procedure } from "..";
import { friendRequests } from "../db/schema/friendRequests";
import { friends } from "../db/schema/friends";
import { User, UserId } from "../db/types/user";
import { httpDb } from "../middleware/httpDb";
import { serverlessDb } from "../middleware/serverlessDb";
import { getUsers } from "./users";

export const friendRequestsRouter = createRouter({
  count: procedure
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
    }),

  list: procedure
    .use(httpDb)
    .output(z.array(User))
    .query(async function ({ ctx }) {
      const rows = await ctx.db.query.friendRequests.findMany({
        columns: { friendId: true },
        where: eq(friendRequests.friendId, ctx.user.id),
      });

      return getUsers(
        rows.map((row) => row.friendId),
        ctx,
      );
    }),

  status: procedure
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
    }),

  create: procedure
    .use(httpDb)
    .input(z.object({ userId: UserId }))
    .output(z.void())
    .mutation(async function ({ ctx, input }) {
      await ctx.db.insert(friendRequests).values({ userId: ctx.user.id, friendId: input.userId });
    }),

  cancel: procedure
    .use(httpDb)
    .input(z.object({ userId: UserId }))
    .output(z.void())
    .mutation(async function ({ ctx, input }) {
      await ctx.db
        .delete(friendRequests)
        .where(
          and(eq(friendRequests.userId, ctx.user.id), eq(friendRequests.friendId, input.userId)),
        );
    }),

  accept: procedure
    .use(serverlessDb)
    .input(z.object({ userId: UserId }))
    .output(z.void())
    .mutation(async function ({ ctx, input }) {
      const rows = await ctx.db
        .delete(friendRequests)
        .where(
          and(eq(friendRequests.userId, input.userId), eq(friendRequests.friendId, ctx.user.id)),
        )
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
    }),

  decline: procedure
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
    }),
});
