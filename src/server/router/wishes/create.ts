import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { wishes } from "../../db/schema/wishes";
import { Id } from "../../db/types";
import { WishDescription, WishLink, WishTitle } from "../../db/types/wishes";
import { httpDb } from "../../middleware/httpDb";

export const create = procedure
  .use(httpDb)
  .input(z.object({ title: WishTitle, description: WishDescription, link: WishLink }))
  .output(Id)
  .mutation(async function ({ ctx, input }) {
    const result = await ctx.db
      .insert(wishes)
      .values({
        title: input.title,
        description: input.description,
        link: input.link,
        userId: ctx.user.id,
      })
      .returning({ id: wishes.id });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return result[0]!.id;
  });
