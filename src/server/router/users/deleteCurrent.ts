import "server-only";
import { z } from "zod";
import { procedure } from "../..";

export const deleteCurrent = procedure.output(z.void()).mutation(async function ({ ctx }) {
  await ctx.db.user.delete({ where: { id: ctx.user.id } });
});
