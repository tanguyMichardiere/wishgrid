import { TRPCError } from "@trpc/server";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { Id } from "../../database/types";
import { WishDescription, WishLink } from "../../database/types/wishes";

export const update = procedure
  .input(z.object({ id: Id, description: WishDescription, link: WishLink }))
  .output(z.void())
  .mutation(async function ({ ctx, input }) {
    const wish = await ctx.db.wish.findUnique({
      select: { userId: true },
      where: { id: input.id },
    });
    if (wish === null) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    if (wish.userId !== ctx.user.id) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    await ctx.db.wish.update({
      data: { description: input.description, link: input.link, viewedBy: { set: [] } },
      where: { id: input.id },
    });
  });
