import { TRPCError } from "@trpc/server";
import "server-only";
import { t } from "..";

export const requireAuthentication = t.middleware(async function ({ ctx, next }) {
  if (ctx.user === null) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});
