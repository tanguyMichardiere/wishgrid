import { z } from "zod";
import { t } from "../..";
import { requireSession } from "../../middlewares/requireSession";
import { friend } from "./friend";

export const user = t.router({
  friend,

  get: t.procedure
    .use(requireSession)
    .input(z.object({ id: z.string().cuid() }))
    .query(async function ({ ctx, input }) {
      ctx.log.debug(`user.get({id: ${input.id}})`);
      const user = await ctx.prisma.user.findUniqueOrThrow({
        select: {
          id: true,
          name: true,
          image: true,
          friends: { select: { id: true } },
          friendRequests: { select: { id: true } },
        },
        where: { id: input.id },
      });
      return {
        id: user.id,
        name: user.name,
        image: user.image,
        friend: user.friends.map((user) => user.id).includes(ctx.session.user.id),
        friendRequest: user.friendRequests.map((user) => user.id).includes(ctx.session.user.id),
      };
    }),

  search: t.procedure
    .use(requireSession)
    .input(z.object({ name: z.string().min(4) }))
    .query(async function ({ ctx, input }) {
      ctx.log.debug(`user.search({name: ${input.name}})`);
      return ctx.prisma.user.findMany({
        select: { id: true, name: true, image: true },
        where: { name: { contains: input.name } },
        take: 10,
      });
    }),
});
