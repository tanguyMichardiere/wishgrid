import { currentUser } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import "server-only";
import { t } from "..";

export const requireAuthentication = t.middleware(async function ({ ctx, next }) {
  const user = await currentUser();
  if (user === null) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});
