import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { friendRequests } from "../../db/schema/friendRequests";
import { UserId } from "../../db/types/user";
import { httpDb } from "../../middleware/httpDb";

export const create = procedure
  .use(httpDb)
  .input(z.object({ userId: UserId }))
  .output(z.void())
  .mutation(async function ({ ctx, input }) {
    await ctx.db.insert(friendRequests).values({ userId: ctx.user.id, friendId: input.userId });
  });
