import { PrismaClient } from "@prisma/client";
import type { Logger } from "pino";
import "server-only";

export function createDatabaseClient(logger: Logger): PrismaClient {
  const prismaClient = new PrismaClient({
    log: [
      { emit: "event", level: "query" },
      { emit: "event", level: "info" },
      { emit: "event", level: "warn" },
      { emit: "event", level: "error" },
    ],
  });

  prismaClient.$on("query", function (e) {
    logger.debug(e, e.query);
  });
  prismaClient.$on("info", function (e) {
    logger.info(e, e.message);
  });
  prismaClient.$on("warn", function (e) {
    logger.warn(e, e.message);
  });
  prismaClient.$on("error", function (e) {
    logger.error(e, e.message);
  });

  return prismaClient;
}
