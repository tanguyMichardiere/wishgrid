import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { Friend } from "../../database/types/user";

export const list = procedure.output(z.array(Friend)).query(async function ({ ctx }) {
  const { friends, viewedWishes } = await ctx.db.user.findUniqueOrThrow({
    include: {
      friends: { include: { wishes: { select: { id: true } } }, orderBy: { name: "asc" } },
      viewedWishes: { select: { id: true } },
    },
    where: { id: ctx.user.id },
  });
  const viewedWishIds = viewedWishes.map(({ id }) => id);

  return friends.map((friend) => ({
    ...friend,
    wishCount: friend.wishes.length,
    newWishCount: friend.wishes.filter(({ id }) => !viewedWishIds.includes(id)).length,
  }));
});
