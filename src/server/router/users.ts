import type { User as ClerkUser } from "@clerk/backend";
import { clerkClient } from "@clerk/nextjs";
import { eq, or } from "drizzle-orm";
import type { Logger } from "next-axiom";
import "server-only";
import { z } from "zod";
import { createRouter, procedure } from "..";
import { comments } from "../db/schema/comments";
import { friendRequests } from "../db/schema/friendRequests";
import { friends } from "../db/schema/friends";
import { wishes } from "../db/schema/wishes";
import { User, UserId } from "../db/types/user";
import { serverlessDb } from "../middleware/serverlessDb";

export async function getUsers(
  userId: Array<string>,
  ctx: { log: Logger },
  options?: { unique?: boolean; map?: false },
): Promise<Array<ClerkUser>>;
export async function getUsers(
  userId: Array<string>,
  ctx: { log: Logger },
  options?: { map?: true },
): Promise<Record<string, ClerkUser>>;
export async function getUsers(
  userId: Array<string>,
  ctx: { log: Logger },
  { unique = true, map = false }: { unique?: boolean; map?: boolean } = {},
): Promise<Array<ClerkUser> | Record<string, ClerkUser>> {
  const uniqueUserId = userId.filter((value, index, array) => array.indexOf(value) === index);
  ctx.log.debug(`retrieving ${uniqueUserId.length} users`, { userId: uniqueUserId });
  // clerkClient.users.getUserList returns all users if called with { userId: [] }
  let users: Array<ClerkUser> = [];
  if (userId.length > 0) {
    users = await clerkClient.users.getUserList({ userId });
  }
  if (!map && unique) {
    // case unique: true, map: false
    // return the list from getUserList, which has no duplicates
    return users;
  }
  const usersById = Object.fromEntries(users.map((user) => [user.id, user]));
  if (map) {
    // case map: true
    // return the mapping { [userId]: user }, with no duplicates
    return usersById;
  }
  // case unique: false, map: false
  // return a list built from the list of IDs, with possible duplicates
  return userId
    .map((userId) => usersById[userId])
    .filter((user): user is ClerkUser => user !== undefined);
}

export const usersRouter = createRouter({
  search: procedure
    .input(z.object({ query: z.string().min(4).max(32) }))
    .output(z.array(User))
    .query(async function ({ ctx, input }) {
      ctx.log.debug(`searching users with '${input.query}'`, { query: input.query });
      return clerkClient.users.getUserList({ query: input.query });
    }),

  getCurrent: procedure.output(User).query(function ({ ctx }) {
    return ctx.user;
  }),

  get: procedure
    .input(z.object({ userId: UserId }))
    .output(User)
    .query(async function ({ ctx, input }) {
      ctx.log.debug(`retrieving ${input.userId}`, { userId: input.userId });
      return clerkClient.users.getUser(input.userId);
    }),

  getMany: procedure
    .input(z.object({ userId: z.array(UserId) }))
    .output(z.array(User))
    .query(async function ({ ctx, input }) {
      return getUsers(input.userId, ctx);
    }),

  deleteCurrent: procedure
    .use(serverlessDb)
    .output(z.void())
    .mutation(async function ({ ctx }) {
      await Promise.all([
        ctx.db.delete(wishes).where(eq(wishes.userId, ctx.user.id)),
        ctx.db
          .update(wishes)
          .set({ reservedById: null })
          .where(eq(wishes.reservedById, ctx.user.id)),
        ctx.db
          .delete(friends)
          .where(or(eq(friends.userId, ctx.user.id), eq(friends.friendId, ctx.user.id))),
        ctx.db
          .delete(friendRequests)
          .where(
            or(eq(friendRequests.userId, ctx.user.id), eq(friendRequests.friendId, ctx.user.id)),
          ),
        // TODO: anonymize comments instead?
        ctx.db.delete(comments).where(eq(comments.userId, ctx.user.id)),
      ]);

      await clerkClient.users.deleteUser(ctx.user.id);
    }),
});
