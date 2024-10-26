import { PrismaClient } from "@prisma/client";
import { formatQuery } from "prisma-query-formatter";
import "server-only";
import { logger } from "../logger";

export const databaseClient = new PrismaClient({
	log: [
		{ emit: "event", level: "query" },
		{ emit: "event", level: "info" },
		{ emit: "event", level: "warn" },
		{ emit: "event", level: "error" },
	],
});

databaseClient.$on("query", (e) => {
	logger.debug(formatQuery(e.query.replaceAll('"public".', ""), e.params, { escapeParams: true }));
});
databaseClient.$on("info", (e) => {
	logger.info(e.message);
});
databaseClient.$on("warn", (e) => {
	logger.warning(e.message);
});
databaseClient.$on("error", (e) => {
	logger.error(e.message);
});
