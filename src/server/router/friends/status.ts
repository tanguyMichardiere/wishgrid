import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { Id } from "../../database/types";

export const status = procedure
  .input(z.object({ userId: Id }))
  .output(z.boolean())
  .query(async function ({ ctx, input }) {
    const { friends } = await ctx.db.user.findUniqueOrThrow({
      include: { friends: { select: { id: true } } },
      where: { id: ctx.user.id },
    });
    return friends.map(({ id }) => id).includes(input.userId);
  });
