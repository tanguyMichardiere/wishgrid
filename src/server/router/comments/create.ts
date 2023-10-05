import { TRPCError } from "@trpc/server";
import { and, eq, inArray } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { comments } from "../../db/schema/comments";
import { wishViews } from "../../db/schema/wishViews";
import { wishes } from "../../db/schema/wishes";
import { Id } from "../../db/types";
import { CommentText, CommentTimestamp } from "../../db/types/comments";
import { serverlessDb } from "../../middleware/serverlessDb";

export const create = procedure
  .use(serverlessDb)
  .input(z.object({ text: CommentText, wishId: Id }))
  .output(z.object({ id: Id, timestamp: CommentTimestamp }))
  .mutation(async function ({ ctx, input }) {
    const wish = await ctx.db.query.wishes.findFirst({
      columns: { userId: true, reservedById: true },
      with: { comments: { columns: { userId: true } } },
      where: eq(wishes.id, input.wishId),
    });
    if (wish === undefined) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    if (wish.userId === ctx.user.id) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    const rows = await ctx.db
      .insert(comments)
      .values({ text: input.text, userId: ctx.user.id, wishId: input.wishId })
      .returning({ id: comments.id, timestamp: comments.timestamp });

    const userIds = new Set(wish.comments.map(({ userId }) => userId));
    if (wish.reservedById !== null) {
      userIds.add(wish.reservedById);
    }
    userIds.delete(ctx.user.id);
    if (userIds.size > 0) {
      await ctx.db
        .delete(wishViews)
        .where(
          and(eq(wishViews.wishId, input.wishId), inArray(wishViews.userId, Array.from(userIds))),
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return rows[0]!;
  });
