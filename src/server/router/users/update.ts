import "server-only";
import sharp from "sharp";
import { z } from "zod";
import { procedure } from "../..";
import { UserName } from "../../database/types/user";

export const update = procedure
  .input(
    z.object({
      name: UserName,
      image: z.optional(z.string().regex(/[A-Za-z0-9+/]+={0,2}/)),
    }),
  )
  .output(z.void())
  .mutation(async function ({ ctx, input }) {
    if (input.image !== undefined) {
      const imageBuffer = await sharp(Buffer.from(input.image, "base64"))
        .resize(96)
        .png()
        .toBuffer();
      await ctx.db.user.update({
        data: {
          name: input.name,
          image: `data:image/png;base64,${imageBuffer.toString("base64")}`,
        },
        where: { id: ctx.user.id },
      });
    }
    await ctx.db.user.update({ data: { name: input.name }, where: { id: ctx.user.id } });
  });
