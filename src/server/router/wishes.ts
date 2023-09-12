import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createRouter, procedure } from "..";
import { comments } from "../db/schema/comments";
import { wishes } from "../db/schema/wishes";
import { Id } from "../db/types";
import { UserId } from "../db/types/user";
import { OwnWish, Wish, WishDescription, WishLink, WishTitle } from "../db/types/wishes";
import { httpDb } from "../middleware/httpDb";
import { serverlessDb } from "../middleware/serverlessDb";
import { getUsers } from "./users";

export const wishesRouter = createRouter({
  create: procedure
    .use(httpDb)
    .input(z.object({ title: WishTitle, description: WishDescription, link: WishLink }))
    .output(Id)
    .mutation(async function ({ ctx, input }) {
      const result = await ctx.db
        .insert(wishes)
        .values({
          title: input.title,
          description: input.description,
          link: input.link,
          userId: ctx.user.id,
        })
        .returning({ id: wishes.id });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return result[0]!.id;
    }),

  reserve: procedure
    .use(serverlessDb)
    .input(z.object({ id: Id }))
    .output(z.void())
    .mutation(async function ({ ctx, input }) {
      const wish = await ctx.db.query.wishes.findFirst({
        columns: { userId: true, reservedById: true },
        where: eq(wishes.id, input.id),
      });
      if (wish === undefined) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (wish.userId === ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      if (wish.reservedById !== null) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      await ctx.db.update(wishes).set({ reservedById: ctx.user.id }).where(eq(wishes.id, input.id));
    }),

  unreserve: procedure
    .use(serverlessDb)
    .input(z.object({ id: Id }))
    .output(z.void())
    .mutation(async function ({ ctx, input }) {
      const wish = await ctx.db.query.wishes.findFirst({
        columns: { userId: true, reservedById: true },
        where: eq(wishes.id, input.id),
      });
      if (wish === undefined) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (wish.userId === ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      if (wish.reservedById !== ctx.user.id) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      await ctx.db.update(wishes).set({ reservedById: null }).where(eq(wishes.id, input.id));
    }),

  delete: procedure
    .use(serverlessDb)
    .input(z.object({ id: Id }))
    .output(z.void())
    .mutation(async function ({ ctx, input }) {
      const wish = await ctx.db.query.wishes.findFirst({
        columns: { userId: true },
        where: eq(wishes.id, input.id),
      });
      if (wish === undefined) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (wish.userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      await ctx.db.delete(comments).where(eq(comments.wishId, input.id));
      await ctx.db.delete(wishes).where(eq(wishes.id, input.id));
    }),

  listOwn: procedure
    .use(httpDb)
    .output(z.array(OwnWish))
    .query(async function ({ ctx }) {
      return ctx.db.query.wishes.findMany({
        columns: { id: true, title: true, description: true, link: true },
        where: eq(wishes.userId, ctx.user.id),
        orderBy: [wishes.title],
      });
    }),

  list: procedure
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
            orderBy: [comments.timestamp],
          },
        },
        where: eq(wishes.userId, input.userId),
        orderBy: [wishes.title],
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
      }));
    }),
});
