import { randomUUID } from "node:crypto";
import { z } from "zod";
import { t } from "../..";
import { Id, UserName } from "../../../utils/fieldTypes";
import { requireSession } from "../../middlewares/requireSession";
import { friend } from "./friend";

export const user = t.router({
  friend,

  get: t.procedure
    .use(requireSession)
    .input(z.object({ id: Id }))
    .query(async function ({ ctx, input }) {
      ctx.log.debug(`user.get({id: ${input.id}})`);
      const user = await ctx.prisma.user.findUniqueOrThrow({
        select: {
          id: true,
          name: true,
          image: true,
          defaultImage: true,
          friends: { select: { id: true } },
          friendRequests: { select: { id: true } },
        },
        where: { id: input.id },
      });
      return {
        id: user.id,
        name: user.name,
        image: user.image,
        defaultImage: user.defaultImage,
        friend: user.friends.map((user) => user.id).includes(ctx.session.user.id),
        friendRequest: user.friendRequests.map((user) => user.id).includes(ctx.session.user.id),
      };
    }),

  search: t.procedure
    .use(requireSession)
    .input(z.object({ name: UserName }))
    .query(async function ({ ctx, input }) {
      ctx.log.debug(`user.search({name: ${input.name}})`);
      return ctx.prisma.user.findMany({
        select: { id: true, name: true, image: true, defaultImage: true },
        where: { name: { search: `${input.name}*` } },
        take: 10,
      });
    }),

  rename: t.procedure
    .use(requireSession)
    .input(z.object({ name: UserName }))
    .mutation(async function ({ ctx, input }) {
      ctx.log.debug(`user.rename({name: ${input.name}})`);
      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });
    }),

  regenerateDefaultImage: t.procedure.use(requireSession).mutation(async function ({ ctx }) {
    ctx.log.debug("user.regenerateDefaultImage");
    await ctx.prisma.user.update({
      where: { id: ctx.session.user.id },
      data: { defaultImage: { set: randomUUID() } },
    });
  }),

  delete: t.procedure.use(requireSession).mutation(async function ({ ctx }) {
    ctx.log.debug("user.delete");
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
