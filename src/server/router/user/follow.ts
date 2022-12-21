import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../..";
import { requireSession } from "../../middlewares/requireSession";

export const follow = t.router({
  request: t.procedure
    .use(requireSession)
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async function ({ ctx, input }) {
      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { followRequests: { connect: { id: input.id } } },
      });
    }),

  accept: t.procedure
    .use(requireSession)
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async function ({ ctx, input }) {
      await ctx.prisma.$transaction(async function (tx) {
        const { followerRequests } = await tx.user.findUniqueOrThrow({
          include: { followerRequests: true },
          where: { id: ctx.session.user.id },
        });
        if (followerRequests.map((user) => user.id).includes(input.id)) {
          await tx.user.update({
            where: { id: ctx.session.user.id },
            data: {
              followerRequests: { disconnect: { id: input.id } },
              followers: { connect: { id: input.id } },
            },
          });
        } else {
          ctx.logger.error(
            `User ${ctx.session.user.id} tried to accept an inexistent follow request from user ${input.id}`
          );
          throw new TRPCError({ code: "BAD_REQUEST", message: "No follower request" });
        }
      });
    }),

  decline: t.procedure
    .use(requireSession)
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async function ({ ctx, input }) {
      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          followerRequests: { disconnect: { id: input.id } },
        },
      });
    }),

  listFollows: t.procedure.use(requireSession).query(async function ({ ctx }) {
    const { follows } = await ctx.prisma.user.findUniqueOrThrow({
      where: { id: ctx.session.user.id },
      include: { follows: true },
    });
    return follows;
  }),
});
