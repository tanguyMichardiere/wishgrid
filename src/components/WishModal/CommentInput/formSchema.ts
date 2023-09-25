import { z } from "zod";
import { CommentText } from "../../../server/db/types/comments";

export const FormSchema = z.object({
  text: CommentText,
});