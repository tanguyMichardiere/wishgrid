import { initTRPC } from "@trpc/server";
import "server-only";
import SuperJSON from "superjson";
import type { Context } from "./context";

export const t = initTRPC.context<Context>().create({ transformer: SuperJSON });
