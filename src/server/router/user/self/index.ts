import { randomUUID } from "node:crypto";
import { z } from "zod";
import { t } from "../../..";
import { UserName } from "../../../../utils/fieldTypes";
import { requireSession } from "../../../middlewares/requireSession";

export const self = t.router({
  getWishList: t.procedure.use(requireSession).query(async function ({ ctx }) {
    const user = await ctx.prisma.user.findUniqueOrThrow({
      select: { wishList: true },
      where: { id: ctx.session.user.id },
    });
    return user.wishList;
  }),

  rename: t.procedure
    .use(requireSession)
    .input(z.object({ name: UserName }))
    .mutation(async function ({ ctx, input }) {
      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });
    }),

  regenerateDefaultImage: t.procedure.use(requireSession).mutation(async function ({ ctx }) {
    await ctx.prisma.user.update({
      where: { id: ctx.session.user.id },
      data: { defaultImage: { set: randomUUID() } },
    });
  }),

  delete: t.procedure.use(requireSession).mutation(async function ({ ctx }) {
    await ctx.prisma.$transaction(async function (tx) {
      await tx.user.update({
        where: { id: ctx.session.user.id },
        data: {
          friends: { set: [] },
          outFriends: { set: [] },
          friendRequests: { set: [] },
          outFriendRequests: { set: [] },
        },
      });
      await tx.user.delete({
        where: { id: ctx.session.user.id },
      });
    });
  }),
});
