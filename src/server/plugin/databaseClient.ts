import { initTRPC } from "@trpc/server";
import type { Logger } from "pino";
import "server-only";
import { createDatabaseClient } from "../database/createClient";

const t = initTRPC.context<{ logger: Logger }>().create();

export const databaseClientPlugin = t.procedure.use(async ({ ctx, next }) =>
  createDatabaseClient(ctx.logger).$transaction((db) => next({ ctx: { ...ctx, db } })),
);
