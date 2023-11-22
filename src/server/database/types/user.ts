import { z } from "zod";
import { Id } from ".";

export const UserName = z.string().min(2).max(32);

export const User = z.object({
  id: Id,
  name: UserName,
  image: z.nullable(z.string().url()),
});
export type User = z.infer<typeof User>;

export const Friend = User.extend({
  wishCount: z.number().nonnegative(),
  newWishCount: z.number().nonnegative(),
});
export type Friend = z.infer<typeof Friend>;
