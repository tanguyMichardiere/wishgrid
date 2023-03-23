import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { t } from "../..";
import { requireSession } from "../../middlewares/requireSession";

export const friend = t.router({
  request: t.procedure
    .use(requireSession)
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async function ({ ctx, input }) {
      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          friendRequests: { connect: { id: input.id } },
          outFriendRequests: { connect: { id: input.id } },
        },
      });
    }),

  accept: t.procedure
    .use(requireSession)
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async function ({ ctx, input }) {
      await ctx.prisma.$transaction(async function (tx) {
        const { friendRequests } = await tx.user.findUniqueOrThrow({
          include: { friendRequests: true },
          where: { id: ctx.session.user.id },
        });
        if (friendRequests.map((user) => user.id).includes(input.id)) {
          await tx.user.update({
            where: { id: ctx.session.user.id },
            data: {
              friendRequests: { disconnect: { id: input.id } },
              outFriendRequests: { disconnect: { id: input.id } },
              friends: { connect: { id: input.id } },
              outFriends: { connect: { id: input.id } },
            },
          });
        } else {
          ctx.logger.error(
            `User ${ctx.session.user.id} tried to accept an inexistent friend request from user ${input.id}`
          );
          throw new TRPCError({ code: "BAD_REQUEST", message: "No friend request" });
        }
      });
    }),

  decline: t.procedure
    .use(requireSession)
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async function ({ ctx, input }) {
      await ctx.prisma.$transaction(async function (tx) {
        const { friendRequests } = await tx.user.findUniqueOrThrow({
          include: { friendRequests: true },
          where: { id: ctx.session.user.id },
        });
        if (friendRequests.map((user) => user.id).includes(input.id)) {
          await tx.user.update({
            where: { id: ctx.session.user.id },
            data: {
              friendRequests: { disconnect: { id: input.id } },
              outFriendRequests: { disconnect: { id: input.id } },
            },
          });
        } else {
          ctx.logger.error(
            `User ${ctx.session.user.id} tried to decline an inexistent friend request from user ${input.id}`
          );
          throw new TRPCError({ code: "BAD_REQUEST", message: "No friend request" });
        }
      });
    }),

  list: t.procedure.use(requireSession).query(async function ({ ctx }) {
    const { friends } = await ctx.prisma.user.findUniqueOrThrow({
      where: { id: ctx.session.user.id },
      include: { friends: true },
    });
    return friends;
  }),
});
