import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { t } from "../..";
import { Id } from "../../../utils/fieldTypes";
import { requireSession } from "../../middlewares/requireSession";

export const wish = t.router({
  create: t.procedure
    .use(requireSession)
    .input(
      z.object({
        title: z.string().min(4).max(32),
        description: z.string().max(256),
        link: z.union([z.literal(""), z.string().url()]),
      })
    )
    .mutation(async function ({ ctx, input }) {
      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { wishList: { create: input } },
      });
    }),

  update: t.procedure
    .use(requireSession)
    .input(
      z.object({
        id: Id,
        data: z.object({
          description: z.optional(z.string()),
          link: z.optional(z.string().url()),
        }),
      })
    )
    .mutation(async function ({ ctx, input }) {
      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          wishList: {
            update: {
              where: { id: input.id },
              data: input.data,
            },
          },
        },
      });
    }),

  reserve: t.procedure
    .use(requireSession)
    .input(z.object({ id: Id }))
    .mutation(async function ({ ctx, input }) {
      await ctx.prisma.$transaction(async function (tx) {
        const { wishList } = await tx.user.findUniqueOrThrow({
          select: { wishList: { select: { id: true } } },
          where: { id: ctx.session.user.id },
        });
        if (wishList.map((wish) => wish.id).includes(input.id)) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }
        const { reservedById } = await tx.wish.findUniqueOrThrow({
          select: { reservedById: true },
          where: { id: input.id },
        });
        if (reservedById !== null) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }
        await tx.wish.update({
          where: { id: input.id },
          data: { reservedBy: { connect: { id: ctx.session.user.id } } },
        });
      });
    }),

  unreserve: t.procedure
    .use(requireSession)
    .input(z.object({ id: Id }))
    .mutation(async function ({ ctx, input }) {
      await ctx.prisma.$transaction(async function (tx) {
        const { reservedById } = await tx.wish.findUniqueOrThrow({
          select: { reservedById: true },
          where: { id: input.id },
        });
        if (reservedById !== ctx.session.user.id) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }
        await tx.wish.update({
          where: { id: input.id },
          data: { reservedBy: { disconnect: {} } },
        });
      });
    }),

  delete: t.procedure
    .use(requireSession)
    .input(z.object({ id: Id }))
    .mutation(async function ({ ctx, input }) {
      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { wishList: { delete: { id: input.id } } },
      });
    }),
});
