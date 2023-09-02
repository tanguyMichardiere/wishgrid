import { z } from "zod";

export const UserId = z.string().regex(/^user_[a-zA-Z0-9]{27}$/);

export const User = z.object({
  id: UserId,
  imageUrl: z.string().url(),
  username: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
});
export type User = z.infer<typeof User>;
