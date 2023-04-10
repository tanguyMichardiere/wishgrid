import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { t } from "../../../..";
import { requireSession } from "../../../../middlewares/requireSession";

export const request = t.router({
  create: t.procedure
    .use(requireSession)
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async function ({ ctx, input }) {
      ctx.log.debug(`user.friend.request.create({id: ${input.id}})`);
      await ctx.prisma.$transaction(async function (tx) {
        const { friends, outFriendRequests } = await tx.user.findUniqueOrThrow({
          select: {
            friends: { select: { id: true } },
            outFriendRequests: { select: { id: true } },
          },
          where: { id: ctx.session.user.id },
        });
        if (friends.map((user) => user.id).includes(input.id)) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }
        if (outFriendRequests.map((user) => user.id).includes(input.id)) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }
        await tx.user.update({
          where: { id: ctx.session.user.id },
          data: { outFriendRequests: { connect: { id: input.id } } },
        });
      });
    }),

  cancel: t.procedure
    .use(requireSession)
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async function ({ ctx, input }) {
      ctx.log.debug(`user.friend.request.cancel({id: ${input.id}})`);
      await ctx.prisma.$transaction(async function (tx) {
        const { outFriendRequests } = await tx.user.findUniqueOrThrow({
          select: { outFriendRequests: { select: { id: true } } },
          where: { id: ctx.session.user.id },
        });
        if (outFriendRequests.map((user) => user.id).includes(input.id)) {
          await tx.user.update({
            where: { id: ctx.session.user.id },
            data: {
              friendRequests: { disconnect: { id: input.id } },
              outFriendRequests: { disconnect: { id: input.id } },
            },
          });
        } else {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }
      });
    }),

  accept: t.procedure
    .use(requireSession)
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async function ({ ctx, input }) {
      ctx.log.debug(`user.friend.request.accept({id: ${input.id}})`);
      await ctx.prisma.$transaction(async function (tx) {
        const { friendRequests } = await tx.user.findUniqueOrThrow({
          select: { friendRequests: { select: { id: true } } },
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
          throw new TRPCError({ code: "BAD_REQUEST" });
        }
      });
    }),

  decline: t.procedure
    .use(requireSession)
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async function ({ ctx, input }) {
      ctx.log.debug(`user.friend.request.decline({id: ${input.id}})`);
      await ctx.prisma.$transaction(async function (tx) {
        const { friendRequests } = await tx.user.findUniqueOrThrow({
          select: { friendRequests: { select: { id: true } } },
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
          throw new TRPCError({ code: "BAD_REQUEST" });
        }
      });
    }),

  count: t.procedure.use(requireSession).query(async function ({ ctx }) {
    ctx.log.debug("user.friend.request.count");
    const { _count } = await ctx.prisma.user.findUniqueOrThrow({
      select: { _count: { select: { friendRequests: true } } },
      where: { id: ctx.session.user.id },
    });
    return _count.friendRequests;
  }),

  list: t.procedure.use(requireSession).query(async function ({ ctx }) {
    ctx.log.debug("user.friend.request.list");
    const { friendRequests } = await ctx.prisma.user.findUniqueOrThrow({
      select: { friendRequests: true },
      where: { id: ctx.session.user.id },
    });
    return friendRequests;
  }),
});
