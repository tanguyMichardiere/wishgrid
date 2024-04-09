import { initTRPC } from "@trpc/server";
import "server-only";
import { transformer } from "../utils/trpc/transformer";
import type { Context } from "./context";
import { databaseClientPlugin } from "./plugin/database-client";
import { requireAuthenticationPlugin } from "./plugin/require-authentication";

const t = initTRPC.context<Context>().create({ transformer });

export const createRouter = t.router;

export const procedure = t.procedure
	.unstable_concat(requireAuthenticationPlugin)
	.unstable_concat(databaseClientPlugin);
