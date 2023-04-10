import { TRPCError } from "@trpc/server";
import { t } from "..";

export const requireSession = t.middleware(function ({ next, ctx }) {
  if (ctx.session === null) {
    ctx.log.debug("unauthenticated");
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  ctx.log = ctx.log.with({ session: ctx.session });
  return next({ ctx: { ...ctx, session: ctx.session } });
});
