import { TRPCError } from "@trpc/server";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { Id } from "../../database/types";
import { User } from "../../database/types/user";

export const get = procedure
  .input(z.object({ userId: Id }))
  .output(User)
  .query(async function ({ ctx, input }) {
    const { friends } = await ctx.db.user.findUniqueOrThrow({
      include: {
        friends: { select: { id: true, name: true, image: true }, where: { id: input.userId } },
      },
      where: { id: ctx.user.id },
    });
    const user = friends[0];
    if (user === undefined) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    return user;
  });
