import { TRPCError, experimental_trpcMiddleware as trpcMiddleware } from "@trpc/server";
import "server-only";
import { auth } from "../../auth";

export const requireAuthentication = trpcMiddleware().create(async function ({ ctx, next }) {
  const session = await auth();
  if (session?.user === undefined) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, user: session.user } });
});
