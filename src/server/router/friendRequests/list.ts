import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { User } from "../../database/types/user";

export const list = procedure.output(z.array(User)).query(async function ({ ctx }) {
  // TODO: orderBy
  const { friendRequests } = await ctx.db.user.findUniqueOrThrow({
    include: { friendRequests: { select: { id: true, name: true, image: true } } },
    where: { id: ctx.user.id },
  });
  return friendRequests;
});
