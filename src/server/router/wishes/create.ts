import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { Id } from "../../database/types";
import { WishDescription, WishLink, WishTitle } from "../../database/types/wishes";

export const create = procedure
  .input(z.object({ title: WishTitle, description: WishDescription, link: WishLink }))
  .output(Id)
  .mutation(async function ({ ctx, input }) {
    const { id } = await ctx.db.wish.create({
      data: {
        title: input.title,
        description: input.description,
        link: input.link,
        userId: ctx.user.id,
      },
      select: { id: true },
    });
    return id;
  });
