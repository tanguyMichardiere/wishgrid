import type { Prisma } from "@prisma/client";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { createNodeClient } from "../../../utils/trpc/server";
import { UserName } from "../../database/types/user";

export const update = procedure
  .input(z.object({ name: UserName, image: z.optional(z.string().regex(/[A-Za-z0-9+/]+={0,2}/)) }))
  .output(z.void())
  .mutation(async function ({ ctx, input }) {
    const data: Prisma.UserUpdateInput = { name: input.name };
    if (input.image !== undefined) {
      try {
        const trpcNode = createNodeClient();
        const images = await trpcNode.imageResize.mutate(input.image);
        data.image = images[96];
      } catch (error) {
        console.error(error);
      }
    }
    await ctx.db.user.update({ data, where: { id: ctx.user.id } });
  });
