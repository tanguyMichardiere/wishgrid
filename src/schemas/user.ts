import { z } from "zod";

export const UserId = z.string().regex(/^user_[a-zA-Z0-9]{27}$/);

export const User = z.object({
  id: UserId,
  imageUrl: z.string().url(),
  primaryEmailAddressId: z.string().nullable(),
  username: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  emailAddresses: z.array(
    z.object({
      id: z.string().regex(/^idn_[a-zA-Z0-9]{27}$/),
      emailAddress: z.string().email(),
    }),
  ),
});
export type User = z.infer<typeof User>;
