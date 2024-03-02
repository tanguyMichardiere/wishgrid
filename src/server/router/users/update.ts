import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { trpcNode } from "../../../utils/trpc/server";
import { UserName } from "../../database/types/user";

export const update = procedure
  .input(z.object({ name: UserName, image: z.optional(z.string().regex(/[A-Za-z0-9+/]+={0,2}/)) }))
  .output(z.void())
  .mutation(async function ({ ctx, input }) {
    if (input.image !== undefined) {
      const images = await trpcNode.imageResize.mutate(input.image);
      await ctx.db.user.update({
        data: { name: input.name, image: images[96] },
        where: { id: ctx.user.id },
      });
    }
    await ctx.db.user.update({ data: { name: input.name }, where: { id: ctx.user.id } });
  });
