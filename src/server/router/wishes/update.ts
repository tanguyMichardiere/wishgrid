import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { wishViews } from "../../db/schema/wishViews";
import { wishes } from "../../db/schema/wishes";
import { Id } from "../../db/types";
import { WishDescription, WishLink } from "../../db/types/wishes";
import { serverlessDb } from "../../middleware/serverlessDb";

export const update = procedure
  .use(serverlessDb)
  .input(z.object({ id: Id, description: WishDescription, link: WishLink }))
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
    await Promise.all([
      ctx.db
        .update(wishes)
        .set({ description: input.description, link: input.link })
        .where(eq(wishes.id, input.id)),
      ctx.db.delete(wishViews).where(eq(wishViews.wishId, input.id)),
    ]);
  });
