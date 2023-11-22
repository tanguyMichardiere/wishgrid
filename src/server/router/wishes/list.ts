import { TRPCError } from "@trpc/server";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { Id } from "../../database/types";
import { Wish } from "../../database/types/wishes";

export const list = procedure
  .input(z.object({ userId: Id }))
  .output(z.array(Wish))
  .query(async function ({ ctx, input }) {
    if (input.userId === ctx.user.id) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    const { friends, viewedWishes } = await ctx.db.user.findUniqueOrThrow({
      include: {
        friends: {
          include: {
            wishes: {
              include: {
                reservedBy: { select: { id: true, name: true, image: true } },
                comments: {
                  include: { user: { select: { id: true, name: true, image: true } } },
                  orderBy: { timestamp: "desc" },
                },
              },
              orderBy: { title: "asc" },
            },
          },
          where: { id: input.userId },
        },
        viewedWishes: { select: { id: true } },
      },
      where: { id: ctx.user.id },
    });
    const user = friends[0];
    if (user === undefined) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    const viewedWishIds = viewedWishes.map(({ id }) => id);
    return user.wishes.map((wish) => ({ ...wish, viewed: viewedWishIds.includes(wish.id) }));
  });
