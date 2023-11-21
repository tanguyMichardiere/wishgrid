import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { Id } from "../../database/types";

export const status = procedure
  .input(z.object({ userId: Id }))
  .output(z.object({ from: z.boolean(), to: z.boolean() }))
  .query(async function ({ ctx, input }) {
    const { friendRequests, outFriendRequests } = await ctx.db.user.findUniqueOrThrow({
      include: {
        friendRequests: { select: { id: true } },
        outFriendRequests: { select: { id: true } },
      },
      where: { id: ctx.user.id },
    });
    return {
      from: friendRequests.map(({ id }) => id).includes(input.userId),
      to: outFriendRequests.map(({ id }) => id).includes(input.userId),
    };
  });
