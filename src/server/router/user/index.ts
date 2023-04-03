import { z } from "zod";
import { t } from "../..";
import { requireSession } from "../../middlewares/requireSession";
import { friend } from "./friend";

export const user = t.router({
  friend,

  get: t.procedure
    .use(requireSession)
    .input(z.object({ id: z.string().cuid() }))
    .query(async function ({ ctx, input }) {
      return ctx.prisma.user.findUniqueOrThrow({ where: { id: input.id } });
    }),
});
