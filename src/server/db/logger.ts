import { type Logger as DrizzleLogger } from "drizzle-orm";
import type { Logger as AxiomLogger } from "next-axiom";
import "server-only";

export class DbLogger implements DrizzleLogger {
  private log: AxiomLogger;

  constructor(log: AxiomLogger) {
    this.log = log;
  }

  logQuery(query: string, params: Array<unknown>): void {
    this.log.debug(
      query,
      Object.fromEntries(
        Object.entries(params).map(([key, value]) => [`$${Number(key) + 1}`, value]),
      ),
    );
  }
}
