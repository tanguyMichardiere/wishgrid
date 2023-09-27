import { z } from "zod";

export const UserId = z.string().regex(/^user_[a-zA-Z0-9]{27}$/);

type UserShape = {
  id: z.ZodString;
  imageUrl: z.ZodString;
  username: z.ZodString;
};

type UserOutput = {
  id: string;
  imageUrl: string;
  username: string;
};

type UserInput = {
  id: string;
  imageUrl: string;
  username: string | null;
};

export const User: z.ZodObject<UserShape, "strip", z.ZodTypeAny, UserOutput, UserInput> = z.object({
  id: UserId,
  imageUrl: z.string().url(),
  username: z.string(),
});
export type User = z.infer<typeof User>;

type FriendShape = UserShape & {
  wishCount: z.ZodNumber;
  newWishCount: z.ZodNumber;
};

type FriendOutput = UserOutput & {
  wishCount: number;
  newWishCount: number;
};

type FriendInput = UserInput & {
  wishCount: number;
  newWishCount: number;
};

export const Friend: z.ZodObject<FriendShape, "strip", z.ZodTypeAny, FriendOutput, FriendInput> =
  User.extend({
    wishCount: z.number().nonnegative(),
    newWishCount: z.number().nonnegative(),
  });
export type Friend = z.infer<typeof Friend>;
