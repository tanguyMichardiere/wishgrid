import type { User as ClerkUser } from "@clerk/backend";
import { clerkClient } from "@clerk/nextjs";
import { eq, or } from "drizzle-orm";
import { log } from "next-axiom";
import "server-only";
import { z } from "zod";
import { t } from "..";
import { User, UserId } from "../../schemas/user";
import { db } from "../db";
import { comments } from "../db/schema/comments";
import { friendRequests } from "../db/schema/friendRequests";
import { friends } from "../db/schema/friends";
import { wishes } from "../db/schema/wishes";
import { requireAuthentication } from "../middleware/requireAuthentication";

export async function getUsers(userId: Array<string>): Promise<Array<ClerkUser>> {
  log.debug(`retrieving ${userId.length} users`, { userId });
  // clerkClient.users.getUserList returns all users if called with { userId: [] }
  if (userId.length > 0) {
    return clerkClient.users.getUserList({ userId });
  }
  return [];
}

export const usersRouter = t.router({
  search: t.procedure
    .use(requireAuthentication)
    .input(z.object({ query: z.string().min(4).max(32) }))
    .output(z.array(User))
    .query(async function ({ input }) {
      log.debug(`searching users with '${input.query}'`, { query: input.query });
      return clerkClient.users.getUserList({ query: input.query });
    }),

  getCurrent: t.procedure
    .use(requireAuthentication)
    .output(User)
    .query(function ({ ctx }) {
      return ctx.user;
    }),

  get: t.procedure
    .use(requireAuthentication)
    .input(z.object({ userId: UserId }))
    .output(User)
    .query(async function ({ input }) {
      log.debug(`retrieving user ${input.userId}`, { userId: input.userId });
      return clerkClient.users.getUser(input.userId);
    }),

  getMany: t.procedure
    .use(requireAuthentication)
    .input(z.object({ userId: z.array(UserId) }))
    .output(z.array(User))
    .query(async function ({ input }) {
      return getUsers(input.userId);
    }),

  deleteCurrent: t.procedure.use(requireAuthentication).mutation(async function ({ ctx }) {
    await Promise.all([
      db.delete(wishes).where(eq(wishes.userId, ctx.user.id)),
      db.update(wishes).set({ reservedById: null }).where(eq(wishes.reservedById, ctx.user.id)),
      db
        .delete(friends)
        .where(or(eq(friends.userId, ctx.user.id), eq(friends.friendId, ctx.user.id))),
      db
        .delete(friendRequests)
        .where(
          or(eq(friendRequests.userId, ctx.user.id), eq(friendRequests.friendId, ctx.user.id)),
        ),
      // TODO: anonymize comments instead?
      db.delete(comments).where(eq(comments.userId, ctx.user.id)),
    ]);

    await clerkClient.users.deleteUser(ctx.user.id);
  }),
});
