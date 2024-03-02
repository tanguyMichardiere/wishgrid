import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import "server-only";
import ws from "ws";
import { env } from "../../env";
import { logger } from "../logger";

if (!("WebSocket" in global)) {
  neonConfig.webSocketConstructor = ws;
}

const pool = new Pool({ connectionString: env.DATABASE_URL });
const adapter = new PrismaNeon(pool);

export const databaseClient = new PrismaClient({
  adapter,
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "info" },
    { emit: "event", level: "warn" },
    { emit: "event", level: "error" },
  ],
});

databaseClient.$on("query", function (e) {
  if (e.params !== "[]") {
    logger.debug(
      e.query,
      Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        (JSON.parse(e.params) as Array<unknown>).map((param, index) => [`$${index + 1}`, param]),
      ),
    );
  } else {
    logger.debug(e.query);
  }
});
databaseClient.$on("info", function (e) {
  logger.info(e.message);
});
databaseClient.$on("warn", function (e) {
  logger.warning(e.message);
});
databaseClient.$on("error", function (e) {
  logger.error(e.message);
});
