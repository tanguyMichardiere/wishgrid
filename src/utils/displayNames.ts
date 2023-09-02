import type { User } from "../schemas/user";

export function missesNames(user: User): boolean {
  return user.firstName === null && user.lastName === null && user.username === null;
}

export function displayNames(user: User): [string, string | null] {
  const names =
    user.firstName !== null || user.lastName !== null
      ? `${user.firstName ?? ""}${user.firstName !== null && user.lastName !== null ? " " : ""}${
          user.lastName ?? ""
        }`
      : null;
  if (names !== null) {
    if (user.username !== null) {
      return [names, user.username];
    }
    return [names, user.id];
  }
  if (user.username !== null) {
    return [user.username, user.id];
  }
  return [user.id, null];
}
