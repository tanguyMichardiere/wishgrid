import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { wishes } from "../../db/schema/wishes";
import { Id } from "../../db/types";
import { serverlessDb } from "../../middleware/serverlessDb";

export const deleteWish = procedure
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
    await ctx.db.delete(wishes).where(eq(wishes.id, input.id));
  });
