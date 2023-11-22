import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { Id } from "../../database/types";

export const deleteWish = procedure
  .input(z.object({ id: Id }))
  .output(z.void())
  .mutation(async function ({ ctx, input }) {
    await ctx.db.user.update({
      data: { wishes: { delete: { id: input.id } } },
      where: { id: ctx.user.id },
    });
  });
