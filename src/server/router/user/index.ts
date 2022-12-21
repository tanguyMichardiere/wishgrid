import { z } from "zod";

import { t } from "../..";
import { requireSession } from "../../middlewares/requireSession";
import { follow } from "./follow";

export const user = t.router({
  follow,

  get: t.procedure
    .use(requireSession)
    .input(z.object({ id: z.string().cuid() }))
    .query(async function ({ ctx, input }) {
      return await ctx.prisma.user.findUniqueOrThrow({ where: { id: input.id } });
    }),
});
