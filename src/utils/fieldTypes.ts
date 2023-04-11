import { z } from "zod";

export const Id = z.coerce.number().int().positive();
export type Id = z.infer<typeof Id>;

export const UserName = z
  .string()
  .min(4)
  .max(32)
  .regex(/^[a-zA-Z][a-zA-Z0-9]*$/, "Must start with a letter and contain only letters and numbers");
export type UserName = z.infer<typeof UserName>;
