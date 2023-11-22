import { z } from "zod";
import { PreprocessedWishLink, WishDescription } from "../../server/database/types/wishes";

export const FormSchema = z.object({
  description: WishDescription,
  link: PreprocessedWishLink,
});
export type FormSchema = z.infer<typeof FormSchema>;
