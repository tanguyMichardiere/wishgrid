import "server-only";
import sharp from "sharp";
import { z } from "zod";
import { procedure } from "..";

export const imageResize = procedure
  .input(
    z.string().transform(function (arg, ctx) {
      try {
        return sharp(Buffer.from(arg, "base64"));
      } catch {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid image" });
        return z.NEVER;
      }
    }),
  )
  .output(z.object({ 96: z.string() }))
  .mutation(async function ({ input }) {
    const [buffer96] = await Promise.all([input.resize(96).webp().toBuffer()]);
    return {
      96: `data:image/webp;base64,${buffer96.toString("base64")}`,
    };
  });
