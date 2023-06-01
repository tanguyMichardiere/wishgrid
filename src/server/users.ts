import type { User } from "@clerk/backend";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { log } from "next-axiom";
import { redirect } from "next/navigation";
import "server-only";

export async function getCurrentUser(): Promise<User> {
  const user = await currentUser();

  if (user === null) {
    log.info("unauthenticated");
    redirect("/sign-in");
  }

  return user;
}

export async function getUsers(userId: Array<string>): Promise<Array<User>> {
  log.debug(`retrieving ${userId.length} users`, { userId });
  // TODO: clerkClient.users.getUserList returns all users if called with { userId: [] }
  let users: Array<User> = [];
  if (userId.length > 0) {
    users = await clerkClient.users.getUserList({ userId });
  }
  return users;
}

export async function getUser(userId: string): Promise<User> {
  log.debug(`retrieving user ${userId}`, { userId });
  return clerkClient.users.getUser(userId);
}

export async function searchUsers(query: string): Promise<Array<User>> {
  log.debug(`searching users with '${query}'`, { query });
  return clerkClient.users.getUserList({ query });
}
