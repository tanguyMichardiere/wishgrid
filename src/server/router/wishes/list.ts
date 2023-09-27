import { TRPCError } from "@trpc/server";
import { asc, desc, eq } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { comments } from "../../db/schema/comments";
import { wishViews } from "../../db/schema/wishViews";
import { wishes } from "../../db/schema/wishes";
import { UserId } from "../../db/types/user";
import { Wish } from "../../db/types/wishes";
import { httpDb } from "../../middleware/httpDb";
import { getUsers } from "../users/getUsers";

export const list = procedure
  .use(httpDb)
  .input(z.object({ userId: UserId }))
  .output(z.array(Wish))
  .query(async function ({ ctx, input }) {
    if (input.userId === ctx.user.id) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    const rows = await ctx.db.query.wishes.findMany({
      columns: { id: true, title: true, description: true, link: true, reservedById: true },
      with: {
        comments: {
          columns: { id: true, text: true, timestamp: true, userId: true },
          orderBy: [desc(comments.timestamp)],
        },
        wishViews: {
          where: eq(wishViews.userId, ctx.user.id),
        },
      },
      where: eq(wishes.userId, input.userId),
      orderBy: [asc(wishes.title)],
    });
    const users = await getUsers(
      rows.flatMap((row) => [
        ...(row.reservedById !== null ? [row.reservedById] : []),
        ...row.comments.map((comment) => comment.userId),
      ]),
      ctx,
      { map: true },
    );
    return rows.map((row) => ({
      ...row,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      reservedBy: row.reservedById !== null ? users[row.reservedById]! : null,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      comments: row.comments.map((comment) => ({ ...comment, user: users[comment.userId]! })),
      viewed: row.wishViews.length === 1,
    }));
  });
