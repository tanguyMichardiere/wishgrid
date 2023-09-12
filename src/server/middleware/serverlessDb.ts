import { experimental_standaloneMiddleware as standaloneMiddleware } from "@trpc/server";
import type { Logger } from "next-axiom";
import "server-only";
import { createServerlessDb } from "../db/serverless";

export const serverlessDb = standaloneMiddleware<{
  ctx: { log: Logger };
}>().create(async function ({ ctx, next }) {
  return createServerlessDb(ctx.log).transaction(async function (db) {
    return next({
      ctx: { ...ctx, db },
    });
  });
});
