import { TRPCError } from "@trpc/server";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { Id } from "../../database/types";

export const accept = procedure
  .input(z.object({ userId: Id }))
  .output(z.void())
  .mutation(async function ({ ctx, input }) {
    const { friendRequests } = await ctx.db.user.findUniqueOrThrow({
      include: { friendRequests: { select: { id: true } } },
      where: { id: ctx.user.id },
    });
    if (!friendRequests.map(({ id }) => id).includes(input.userId)) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    await ctx.db.user.update({
      data: {
        friendRequests: { disconnect: { id: input.userId } },
        outFriendRequests: { disconnect: { id: input.userId } },
        friends: { connect: { id: input.userId } },
        outFriends: { connect: { id: input.userId } },
      },
      where: { id: ctx.user.id },
    });
  });
