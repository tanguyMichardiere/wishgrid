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
    const friendIdsPromise = ctx.db.query.friends
      .findMany({
        columns: { friendId: true },
        where: eq(friends.userId, ctx.user.id),
      })
      .then((friendIds) => friendIds.map((row) => row.friendId));

    const [users, wishCount, viewedWishes] = await Promise.all([
      friendIdsPromise.then((friendIds) => getUsers(friendIds, ctx)),
      friendIdsPromise.then((friendIds) =>
        friendIds.length > 0
          ? ctx.db
              .select({ userId: wishes.userId, wishCount: sql<string>`count(*)` })
              .from(wishes)
              .where(inArray(wishes.userId, friendIds))
              .groupBy(wishes.userId)
          : [],
      ),
      // TODO: optimize with aggregate
      ctx.db.query.wishViews.findMany({
        columns: {},
        with: { wish: { columns: { userId: true } } },
        where: eq(wishViews.userId, ctx.user.id),
      }),
    ]);

    const wishCountByUserId = Object.fromEntries(
      wishCount.map(({ userId, wishCount }) => [userId, parseInt(wishCount)]),
    );

    const viewedWishCountByUserId = new Map<string, number>();
    for (const {
      wish: { userId },
    } of viewedWishes) {
      viewedWishCountByUserId.set(userId, (viewedWishCountByUserId.get(userId) ?? 0) + 1);
    }

    return (
      users
        // username is required in Clerk config
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .sort((a, b) => a.username!.localeCompare(b.username!))
        .map((user) => ({
          ...user,
          wishCount: wishCountByUserId[user.id] ?? 0,
          newWishCount:
            (wishCountByUserId[user.id] ?? 0) - (viewedWishCountByUserId.get(user.id) ?? 0),
        }))
    );
  });
