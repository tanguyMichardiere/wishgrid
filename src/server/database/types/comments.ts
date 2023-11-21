import { z } from "zod";
import { Id } from ".";
import { User } from "./user";

export const CommentText = z.string().min(4).max(256);
export const CommentTimestamp = z.date();

export const Comment = z.object({
  id: Id,
  text: CommentText,
  timestamp: CommentTimestamp,
  user: User,
});
export type Comment = z.infer<typeof Comment>;
