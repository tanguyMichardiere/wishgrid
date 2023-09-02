import { z } from "zod";

export const UserId = z.string().regex(/^user_[a-zA-Z0-9]{27}$/);

export const User: z.ZodObject<
  {
    id: z.ZodString;
    imageUrl: z.ZodString;
    username: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    id: string;
    imageUrl: string;
    username: string;
  },
  {
    id: string;
    imageUrl: string;
    username: string | null;
  }
> = z.object({
  id: UserId,
  imageUrl: z.string().url(),
  username: z.string(),
});
export type User = z.infer<typeof User>;
