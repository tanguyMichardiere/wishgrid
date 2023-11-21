import { z } from "zod";
import { CommentText } from "../../../server/database/types/comments";

export const FormSchema = z.object({
  text: CommentText,
});
export type FormSchema = z.infer<typeof FormSchema>;
