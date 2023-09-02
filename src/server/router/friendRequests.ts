import { TRPCError } from "@trpc/server";
import { and, eq, or, sql } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { t } from "..";
import { User, UserId } from "../../schemas/user";
import { db } from "../db";
import { friendRequests } from "../db/schema/friendRequests";
import { friends } from "../db/schema/friends";
import { requireAuthentication } from "../middleware/requireAuthentication";
import { getUsers } from "./users";

export const friendRequestsRouter = t.router({
  count: t.procedure.use(requireAuthentication).query(async function ({ ctx }) {
    const rows = await db
      .select({ count: sql<number>`count(*)` })
      .from(friendRequests)
      .where(eq(friendRequests.friendId, ctx.user.id));
    // count will always return exactly one row
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return rows[0]!.count;
  }),

  list: t.procedure
    .use(requireAuthentication)
    .output(z.array(User))
    .query(async function ({ ctx }) {
      const rows = await db
        .select({ id: friendRequests.userId })
        .from(friendRequests)
        .where(eq(friendRequests.friendId, ctx.user.id));

      return getUsers(rows.map((row) => row.id));
    }),

  status: t.procedure
    .use(requireAuthentication)
    .input(z.object({ userId: UserId }))
    .query(async function ({ ctx, input }) {
      const rows = await db
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

  create: t.procedure
    .use(requireAuthentication)
    .input(z.object({ userId: UserId }))
    .mutation(async function ({ ctx, input }) {
      await db.insert(friendRequests).values({ userId: ctx.user.id, friendId: input.userId });
    }),

  cancel: t.procedure
    .use(requireAuthentication)
    .input(z.object({ userId: UserId }))
    .mutation(async function ({ ctx, input }) {
      await db
        .delete(friendRequests)
        .where(
          and(eq(friendRequests.userId, ctx.user.id), eq(friendRequests.friendId, input.userId)),
        );
    }),

  accept: t.procedure
    .use(requireAuthentication)
    .input(z.object({ userId: UserId }))
    .mutation(async function ({ ctx, input }) {
      await db.transaction(async function (tx) {
        const rows = await tx
          .delete(friendRequests)
          .where(
            and(eq(friendRequests.userId, input.userId), eq(friendRequests.friendId, ctx.user.id)),
          )
          .returning();
        if (rows.length === 0) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }
        await tx
          .delete(friendRequests)
          .where(
            and(eq(friendRequests.userId, input.userId), eq(friendRequests.friendId, ctx.user.id)),
          );
        await tx.insert(friends).values([
          { userId: ctx.user.id, friendId: input.userId },
          { userId: input.userId, friendId: ctx.user.id },
        ]);
      });
    }),

  decline: t.procedure
    .use(requireAuthentication)
    .input(z.object({ userId: UserId }))
    .mutation(async function ({ ctx, input }) {
      await db
        .delete(friendRequests)
        .where(
          or(
            and(eq(friendRequests.userId, input.userId), eq(friendRequests.friendId, ctx.user.id)),
            and(eq(friendRequests.userId, input.userId), eq(friendRequests.friendId, ctx.user.id)),
          ),
        );
    }),
});
