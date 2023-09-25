import { eq } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { friends } from "../../db/schema/friends";
import { User } from "../../db/types/user";
import { httpDb } from "../../middleware/httpDb";
import { getUsers } from "../users/getUsers";

export const list = procedure
  .use(httpDb)
  .output(z.array(User))
  .query(async function ({ ctx }) {
    const friendIds = await ctx.db.query.friends.findMany({
      columns: { friendId: true },
      where: eq(friends.userId, ctx.user.id),
    });

    const users = await getUsers(
      friendIds.map((row) => row.friendId),
      ctx,
    );

    // username is required in Clerk config
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return users.sort((a, b) => a.username!.localeCompare(b.username!));
  });
