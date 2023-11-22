import { TRPCError } from "@trpc/server";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { Id } from "../../database/types";

export const reserve = procedure
  .input(z.object({ id: Id }))
  .output(z.void())
  .mutation(async function ({ ctx, input }) {
    const wish = await ctx.db.wish.findUnique({
      select: { userId: true, reservedById: true },
      where: { id: input.id },
    });
    if (wish === null) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    if (wish.userId === ctx.user.id) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    if (wish.reservedById !== null) {
      throw new TRPCError({ code: "BAD_REQUEST" });
    }
    await ctx.db.wish.update({ data: { reservedById: ctx.user.id }, where: { id: input.id } });
  });
