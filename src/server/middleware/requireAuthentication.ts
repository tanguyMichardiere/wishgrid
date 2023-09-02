import { TRPCError } from "@trpc/server";
import "server-only";
import { createMiddleware } from "..";

export const requireAuthentication = createMiddleware(async function ({ ctx, next }) {
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
