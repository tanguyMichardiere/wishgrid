import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { t } from "../../..";
import { Id } from "../../../../utils/fieldTypes";
import { requireSession } from "../../../middlewares/requireSession";
import { request } from "./request";

export const friend = t.router({
  request,

  list: t.procedure.use(requireSession).query(async function ({ ctx }) {
    const { friends } = await ctx.prisma.user.findUniqueOrThrow({
      select: { friends: { select: { id: true, name: true, image: true, defaultImage: true } } },
      where: { id: ctx.session.user.id },
    });
    return friends;
  }),

  get: t.procedure
    .use(requireSession)
    .input(z.object({ id: Id }))
    .query(async function ({ ctx, input }) {
      return ctx.prisma.$transaction(async function (tx) {
        const { friends } = await tx.user.findUniqueOrThrow({
          select: { friends: { select: { id: true } } },
          where: { id: ctx.session.user.id },
        });
        if (friends.map((user) => user.id).includes(input.id)) {
          return tx.user.findUniqueOrThrow({
            select: { id: true, name: true, image: true, defaultImage: true, wishList: true },
            where: { id: input.id },
          });
        }
        throw new TRPCError({ code: "BAD_REQUEST" });
      });
    }),

  remove: t.procedure
    .use(requireSession)
    .input(z.object({ id: Id }))
    .mutation(async function ({ ctx, input }) {
      await ctx.prisma.$transaction(async function (tx) {
        const { friends } = await tx.user.findUniqueOrThrow({
          select: { friends: { select: { id: true } } },
          where: { id: ctx.session.user.id },
        });
        if (friends.map((user) => user.id).includes(input.id)) {
          await tx.user.update({
            where: { id: ctx.session.user.id },
            data: {
              friends: { disconnect: { id: input.id } },
              outFriends: { disconnect: { id: input.id } },
            },
          });
        } else {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }
      });
    }),
});
