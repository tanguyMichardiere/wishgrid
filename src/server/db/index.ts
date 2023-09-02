import type { Logger as DrizzleLogger } from "drizzle-orm";
import type { NeonDatabase } from "drizzle-orm/neon-serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import type { Logger as AxiomLogger } from "next-axiom";
import "server-only";
import { pool } from "./pool";

class Logger implements DrizzleLogger {
  private log: AxiomLogger;

  constructor(log: AxiomLogger) {
    this.log = log;
  }

  logQuery(query: string, params: Array<unknown>) {
    this.log.debug(
      query,
      Object.fromEntries(
        Object.entries(params).map(([key, value]) => [`$${Number(key) + 1}`, value]),
      ),
    );
  }
}

export const createDb = (log: AxiomLogger): NeonDatabase =>
  drizzle(pool, { logger: new Logger(log) });
