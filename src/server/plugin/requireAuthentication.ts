import { initTRPC, TRPCError } from "@trpc/server";
import "server-only";
import { auth } from "../../auth";

const t = initTRPC.create();

export const requireAuthenticationPlugin = t.procedure.use(async function ({ ctx, next }) {
  const session = await auth();
  if (session?.user === undefined) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, user: session.user } });
});
