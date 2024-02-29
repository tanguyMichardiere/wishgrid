import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { UserName } from "../../database/types/user";

export const update = procedure
  .input(z.object({ name: UserName, image: z.optional(z.string().regex(/[A-Za-z0-9+/]+={0,2}/)) }))
  .output(z.void())
  .mutation(async function ({ ctx, input }) {
    if (input.image !== undefined) {
      const sharp = await import("sharp");
      const imageBuffer = await sharp
        .default(Buffer.from(input.image, "base64"))
        .resize(96)
        .webp()
        .toBuffer();
      await ctx.db.user.update({
        data: {
          name: input.name,
          image: `data:image/webp;base64,${imageBuffer.toString("base64")}`,
        },
        where: { id: ctx.user.id },
      });
    }
    await ctx.db.user.update({ data: { name: input.name }, where: { id: ctx.user.id } });
  });
