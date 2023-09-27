import { type Logger as DrizzleLogger } from "drizzle-orm";
import type { Logger as PinoLogger } from "pino";
import "server-only";

export class DbLogger implements DrizzleLogger {
  private logger: PinoLogger;

  constructor(logger: PinoLogger) {
    this.logger = logger;
  }

  logQuery(query: string, params: Array<unknown>): void {
    this.logger.debug(
      Object.fromEntries(
        Object.entries(params).map(([key, value]) => [`$${Number(key) + 1}`, value]),
      ),
      query,
    );
  }
}
