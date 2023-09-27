import { experimental_standaloneMiddleware as standaloneMiddleware } from "@trpc/server";
import type { Logger } from "pino";
import "server-only";
import { createServerlessDb } from "../db/serverless";

export const serverlessDb = standaloneMiddleware<{
  ctx: { logger: Logger };
}>().create(async function ({ ctx, next }) {
  return createServerlessDb(ctx.logger).transaction(async function (db) {
    return next({
      ctx: { ...ctx, db },
    });
  });
});
