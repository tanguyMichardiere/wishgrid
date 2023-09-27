import { z } from "zod";
import { PreprocessedWishLink, WishDescription, WishTitle } from "../../server/db/types/wishes";

export const FormSchema = z.object({
  title: WishTitle,
  description: WishDescription,
  link: PreprocessedWishLink,
});
export type FormSchema = z.infer<typeof FormSchema>;
