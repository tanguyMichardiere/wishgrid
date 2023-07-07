import type { User } from "@clerk/nextjs/dist/types/server";

export function displayName(user: User): [string, string | null] {
  if (user.firstName !== null) {
    if (user.lastName !== null) {
      return [`${user.firstName} ${user.lastName}`, user.username];
    }
    return [user.firstName, user.username];
  }
  // all users have a primary email address
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const emailAddress = user.emailAddresses.find(
    (emailAddress) => emailAddress.id === user.primaryEmailAddressId
  )!.emailAddress;
  if (user.username !== null) {
    return [user.username, emailAddress];
  }
  return [emailAddress, null];
}
