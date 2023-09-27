import { experimental_standaloneMiddleware as standaloneMiddleware } from "@trpc/server";
import type { Logger } from "pino";
import "server-only";
import { createHttpDb } from "../db/http";

export const httpDb = standaloneMiddleware<{
  ctx: { logger: Logger };
}>().create(async function ({ ctx, next }) {
  return next({
    ctx: { ...ctx, db: createHttpDb(ctx.logger) },
  });
});
