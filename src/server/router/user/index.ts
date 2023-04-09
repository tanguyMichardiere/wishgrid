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
      ctx.log.debug(`user.get({id: ${input.id}})`);
      return ctx.prisma.user.findUniqueOrThrow({
        select: { id: true, name: true, image: true },
        where: { id: input.id },
      });
    }),
});
