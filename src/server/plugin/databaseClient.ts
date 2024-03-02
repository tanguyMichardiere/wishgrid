import { initTRPC } from "@trpc/server";
import "server-only";
import { databaseClient } from "../database/client";

const t = initTRPC.create();

export const databaseClientPlugin = t.procedure.use(async ({ ctx, next }) =>
  databaseClient.$transaction((db) => next({ ctx: { ...ctx, db } })),
);
