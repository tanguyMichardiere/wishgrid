import { initTRPC } from "@trpc/server";
import "server-only";
import SuperJSON from "superjson";
import type { Context } from "./context";
import { databaseClientPlugin } from "./plugin/databaseClient";
import { loggerPlugin } from "./plugin/logger";
import { requireAuthenticationPlugin } from "./plugin/requireAuthentication";

const t = initTRPC.context<Context>().create({ transformer: SuperJSON });

export const createRouter = t.router;

export const procedure = t.procedure
  .unstable_concat(loggerPlugin)
  .unstable_concat(requireAuthenticationPlugin)
  .unstable_concat(databaseClientPlugin);
