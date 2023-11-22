import { TRPCError } from "@trpc/server";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { Id } from "../../database/types";
import { CommentText, CommentTimestamp } from "../../database/types/comments";

export const create = procedure
  .input(z.object({ text: CommentText, wishId: Id }))
  .output(z.object({ id: Id, timestamp: CommentTimestamp }))
  .mutation(async function ({ ctx, input }) {
    const wish = await ctx.db.wish.findUnique({ where: { id: input.wishId } });
    if (wish === null) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    if (wish.userId === ctx.user.id) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    const comment = await ctx.db.comment.create({
      data: { text: input.text, userId: ctx.user.id, wishId: input.wishId },
      select: { id: true, timestamp: true },
    });

    await ctx.db.wish.update({
      data: { viewedBy: { set: [{ id: ctx.user.id }] } },
      where: { id: input.wishId },
    });

    return comment;
  });
