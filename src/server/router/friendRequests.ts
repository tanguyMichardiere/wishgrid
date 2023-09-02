import { TRPCError } from "@trpc/server";
import { and, eq, or, sql } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { createRouter } from "..";
import { User, UserId } from "../../schemas/user";
import { friendRequests } from "../db/schema/friendRequests";
import { friends } from "../db/schema/friends";
import { procedure } from "../procedure";
import { getUsers } from "./users";

export const friendRequestsRouter = createRouter({
  count: procedure.output(z.number().int().nonnegative()).query(async function ({ ctx }) {
    const rows = await ctx.db
      .select({ count: sql<string>`count(*)` })
      .from(friendRequests)
      .where(eq(friendRequests.friendId, ctx.user.id));

    // count will always return exactly one row
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return parseInt(rows[0]!.count);
  }),

  list: procedure.output(z.array(User)).query(async function ({ ctx }) {
    const rows = await ctx.db
      .select({ id: friendRequests.userId })
      .from(friendRequests)
      .where(eq(friendRequests.friendId, ctx.user.id));

    return getUsers(
      rows.map((row) => row.id),
      ctx.log,
    );
  }),

  status: procedure
    .input(z.object({ userId: UserId }))
    .output(z.object({ from: z.boolean(), to: z.boolean() }))
    .query(async function ({ ctx, input }) {
      const rows = await ctx.db
        .select({ userId: friendRequests.userId })
        .from(friendRequests)
        .where(
          or(
            and(eq(friendRequests.userId, ctx.user.id), eq(friendRequests.friendId, input.userId)),
            and(eq(friendRequests.userId, input.userId), eq(friendRequests.friendId, ctx.user.id)),
          ),
        );
      const userIds = rows.map((row) => row.userId);

      return { from: userIds.includes(input.userId), to: userIds.includes(ctx.user.id) };
    }),

  create: procedure
    .input(z.object({ userId: UserId }))
    .output(z.void())
    .mutation(async function ({ ctx, input }) {
      await ctx.db.insert(friendRequests).values({ userId: ctx.user.id, friendId: input.userId });
    }),

  cancel: procedure
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
