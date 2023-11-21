import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { Id } from "../../database/types";

export const decline = procedure
  .input(z.object({ userId: Id }))
  .output(z.void())
  .mutation(async function ({ ctx, input }) {
    await ctx.db.user.update({
      data: { friendRequests: { disconnect: { id: input.userId } } },
      where: { id: ctx.user.id },
    });
  });
