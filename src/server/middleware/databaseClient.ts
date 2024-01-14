import { experimental_trpcMiddleware as trpcMiddleware } from "@trpc/server";
import type { Logger } from "pino";
import "server-only";
import { createDatabaseClient } from "../database/createClient";

export const databaseClient = trpcMiddleware<{
  ctx: { logger: Logger };
}>().create(async ({ ctx, next }) =>
  createDatabaseClient(ctx.logger).$transaction(async (db) => next({ ctx: { ...ctx, db } })),
);
