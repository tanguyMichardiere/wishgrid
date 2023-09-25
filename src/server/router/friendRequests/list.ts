import { eq } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { friendRequests } from "../../db/schema/friendRequests";
import { User } from "../../db/types/user";
import { httpDb } from "../../middleware/httpDb";
import { getUsers } from "../users/getUsers";

export const list = procedure
  .use(httpDb)
  .output(z.array(User))
  .query(async function ({ ctx }) {
    const rows = await ctx.db.query.friendRequests.findMany({
      columns: { userId: true },
      where: eq(friendRequests.friendId, ctx.user.id),
    });

    return getUsers(
      rows.map((row) => row.userId),
      ctx,
    );
  });
