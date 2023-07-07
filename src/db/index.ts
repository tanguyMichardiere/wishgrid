import { drizzle } from "drizzle-orm/neon-serverless";
import { log } from "next-axiom";
import "server-only";
import { pool } from "./pool";

function logQuery(query: string, params: Array<unknown>) {
  log.debug(
    query,
    Object.fromEntries(Object.entries(params).map(([key, value]) => [`$${Number(key) + 1}`, value]))
  );
}

export const db = drizzle(pool, { logger: { logQuery } });
