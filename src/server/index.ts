import { initTRPC } from "@trpc/server";
import "server-only";
import SuperJSON from "superjson";
import type { Context } from "./context";
import { createDb } from "./db";

const t = initTRPC.context<Context>().create({ transformer: SuperJSON });

export const createRouter = t.router;
export const createMiddleware = t.middleware;

const loggerMiddleware = createMiddleware(async function ({ ctx, path, rawInput, next }) {
  // ctx.log.debug(path, { input: rawInput });
  const result = await next(/*{ ctx: { ...ctx, log: ctx.log.with({ path, input: rawInput }) } }*/);
  // const now = Date.now();
  // ctx.log.debug(path, {
  //   input: rawInput,
  //   timings: {
  //     createContext: ctx.contextCreated - ctx.start,
  //     procedure: now - ctx.contextCreated,
  //     total: now - ctx.start,
  //   },
  // });
  // try {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //   await ctx.log.flush();
  // } catch {
  //   // ignore
  // }
  return result;
});

const dbTransactionMiddleware = createMiddleware(async function ({ ctx, next }) {
  return createDb(ctx.log).transaction(async function (db) {
    return next({ ctx: { ...ctx, db } });
  });
});

export const publicProcedure = t.procedure.use(loggerMiddleware).use(dbTransactionMiddleware);
