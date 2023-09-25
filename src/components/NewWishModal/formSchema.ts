import { z } from "zod";
import { WishDescription, WishLink, WishTitle } from "../../server/db/types/wishes";

export const FormSchema = z.object({
  title: WishTitle,
  description: WishDescription,
  link: z.preprocess(
    (arg) =>
      typeof arg === "string" &&
      arg.length > 0 &&
      !arg.startsWith("http://") &&
      !arg.startsWith("https://")
        ? `https://${arg}`
        : arg,
    WishLink,
  ),
});
