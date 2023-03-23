import { TRPCError } from "@trpc/server";
import { t } from "..";

export const requireSession = t.middleware(function ({ next, ctx }) {
  if (ctx.session === null) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, session: ctx.session } });
});
