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
    const user = await ctx.db.user.findUnique({
      select: { id: true, name: true, image: true },
      where: { id: input.userId },
    });
    if (user === null) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    return user;
  });
