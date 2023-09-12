import { initTRPC } from "@trpc/server";
import "server-only";
import SuperJSON from "superjson";
import type { Context } from "./context";
import { logger } from "./middleware/logger";
import { requireAuthentication } from "./middleware/requireAuthentication";

const t = initTRPC.context<Context>().create({ transformer: SuperJSON });

export const createRouter = t.router;

export const procedure = t.procedure.use(logger).use(requireAuthentication);
