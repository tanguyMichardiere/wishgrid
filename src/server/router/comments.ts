import { z } from "zod";
import { createRouter, procedure } from "..";
import { comments } from "../db/schema/comments";
import { Id } from "../db/types";
import { CommentText, CommentTimestamp } from "../db/types/comments";
import { httpDb } from "../middleware/httpDb";

export const commentsRouter = createRouter({
  create: procedure
    .use(httpDb)
    .input(z.object({ text: CommentText, wishId: Id }))
    .output(z.object({ id: Id, timestamp: CommentTimestamp }))
    .mutation(async function ({ ctx, input }) {
      const rows = await ctx.db
        .insert(comments)
        .values({ text: input.text, userId: ctx.user.id, wishId: input.wishId })
        .returning({ id: comments.id, timestamp: comments.timestamp });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return rows[0]!;
    }),
});
