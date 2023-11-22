import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { OwnWish } from "../../database/types/wishes";

export const listOwn = procedure.output(z.array(OwnWish)).query(async function ({ ctx }) {
  const { wishes } = await ctx.db.user.findUniqueOrThrow({
    include: {
      wishes: {
        select: { id: true, title: true, description: true, link: true },
        orderBy: { title: "asc" },
      },
    },
    where: { id: ctx.user.id },
  });
  return wishes;
});
