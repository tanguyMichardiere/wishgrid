import { experimental_standaloneMiddleware as standaloneMiddleware } from "@trpc/server";
import type { Logger } from "next-axiom";
import "server-only";
import { createHttpDb } from "../db/http";

export const httpDb = standaloneMiddleware<{
  ctx: { log: Logger };
}>().create(async function ({ ctx, next }) {
  return next({
    ctx: { ...ctx, db: createHttpDb(ctx.log) },
  });
});
