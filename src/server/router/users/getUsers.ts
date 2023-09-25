import type { User as ClerkUser } from "@clerk/backend";
import { clerkClient } from "@clerk/nextjs";
import type { Logger } from "next-axiom";
import "server-only";

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
