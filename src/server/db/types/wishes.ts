import { z } from "zod";
import { Id } from ".";
import { Comment } from "./comments";
import { User } from "./user";

export const WishTitle = z.string().min(4).max(32);
export const WishDescription = z.string().max(512);
export const WishLink = z.union([z.string().url().max(512), z.string().max(0)]);

export const OwnWish = z.object({
  id: Id,
  title: WishTitle,
  description: WishDescription,
  link: WishLink,
});
export type OwnWish = z.infer<typeof OwnWish>;

export const Wish = z.object({
  id: Id,
  title: WishTitle,
  description: WishDescription,
  link: WishLink,
  reservedBy: z.nullable(User),
  comments: z.array(Comment),
});
export type Wish = z.infer<typeof Wish>;
