import { z } from "zod";
import { t } from "../..";
import { Id, UserName } from "../../../utils/fieldTypes";
import { requireSession } from "../../middlewares/requireSession";
import { friend } from "./friend";
import { self } from "./self";

export const user = t.router({
  self,

  friend,

  get: t.procedure
    .use(requireSession)
    .input(z.object({ id: Id }))
    .query(async function ({ ctx, input }) {
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
      return ctx.prisma.user.findMany({
        select: { id: true, name: true, image: true, defaultImage: true },
        where: { name: { search: `${input.name}*` } },
        take: 10,
      });
    }),
});
