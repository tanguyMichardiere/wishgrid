import type { Prisma } from "@prisma/client";
import "server-only";
import sharp from "sharp";
import { z } from "zod";
import { procedure } from "../..";
import { UserName } from "../../database/types/user";

export const update = procedure
  .input(
    z.object({
      name: UserName,
      image: z.optional(
        z.string().transform(function (arg, ctx) {
          try {
            return sharp(Buffer.from(arg, "base64"));
          } catch {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid image" });
            return z.NEVER;
          }
        }),
      ),
    }),
  )
  .output(z.void())
  .mutation(async function ({ ctx, input }) {
    const data: Prisma.UserUpdateInput = { name: input.name };
    if (input.image !== undefined) {
      data.image = `data:image/webp;base64,${(await input.image.resize(96).webp().toBuffer()).toString("base64")}`;
    }
    await ctx.db.user.update({ data, where: { id: ctx.user.id } });
  });
