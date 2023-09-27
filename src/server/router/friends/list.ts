import { eq, inArray, sql } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { friends } from "../../db/schema/friends";
import { wishViews } from "../../db/schema/wishViews";
import { wishes } from "../../db/schema/wishes";
import { Friend } from "../../db/types/user";
import { serverlessDb } from "../../middleware/serverlessDb";
import { getUsers } from "../users/getUsers";

export const list = procedure
  .use(serverlessDb)
  .output(z.array(Friend))
  .query(async function ({ ctx }) {
    const friendIds = await ctx.db.query.friends
      .findMany({
        columns: { friendId: true },
        where: eq(friends.userId, ctx.user.id),
      })
      .then((friendIds) => friendIds.map((row) => row.friendId));

    const users = await getUsers(friendIds, ctx);

    const wishCount =
      friendIds.length > 0
        ? await ctx.db
            .select({ userId: wishes.userId, wishCount: sql<string>`count(*)` })
            .from(wishes)
            .where(inArray(wishes.userId, friendIds))
            .groupBy(wishes.userId)
        : [];
    const wishCountByUserId = Object.fromEntries(
      wishCount.map(({ userId, wishCount }) => [userId, parseInt(wishCount)]),
    );

    // TODO: optimize with aggregate
    const viewedWishes = await ctx.db.query.wishViews.findMany({
      columns: { wishId: true },
      with: { wish: { columns: { userId: true } } },
      where: eq(wishViews.userId, ctx.user.id),
    });
    const viewedWishCountByUserId = viewedWishes.reduce<Record<string, number>>(
      (viewedWishCountByUserId, { wish: { userId } }) =>
        userId in viewedWishCountByUserId
          ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            { ...viewedWishCountByUserId, [userId]: viewedWishCountByUserId[userId]! + 1 }
          : { ...viewedWishCountByUserId, [userId]: 1 },
      {},
    );

    return (
      users
        // username is required in Clerk config
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .sort((a, b) => a.username!.localeCompare(b.username!))
        .map((user) => ({
          ...user,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          wishCount: wishCountByUserId[user.id]!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          newWishCount: wishCountByUserId[user.id]! - (viewedWishCountByUserId[user.id] ?? 0),
        }))
    );
  });
