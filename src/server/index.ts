import { initTRPC } from "@trpc/server";
import "server-only";
import SuperJSON from "superjson";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create({ transformer: SuperJSON });

export const createRouter = t.router;
export const createMiddleware = t.middleware;

const loggerMiddleware = createMiddleware(async function ({ ctx, path, input, next }) {
  ctx.log.debug(path, { input });
  const result = await next();
  const now = Date.now();
  ctx.log.debug(path, {
    input,
    timings: {
      createContext: ctx.contextCreated - ctx.start,
      procedure: now - ctx.contextCreated,
      total: now - ctx.start,
    },
  });
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await ctx.log.flush();
  } catch {
    // ignore
  }
  return result;
});

export const publicProcedure = t.procedure.use(loggerMiddleware);
