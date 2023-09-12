import { currentUser } from "@clerk/nextjs";
import { TRPCError, experimental_standaloneMiddleware as standaloneMiddleware } from "@trpc/server";
import "server-only";

export const requireAuthentication = standaloneMiddleware().create(async function ({ ctx, next }) {
  const user = await currentUser();
  if (user === null) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: { ...ctx, user },
  });
});
