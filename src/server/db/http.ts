import { neon, neonConfig } from "@neondatabase/serverless";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { drizzle } from "drizzle-orm/neon-http";
import type { Logger } from "pino";
import "server-only";
import { DATABASE_URL } from "../../env";
import { DbLogger } from "./logger";
import { schema } from "./schema";

neonConfig.fetchConnectionCache = true;

const sql = neon(DATABASE_URL);

export const createHttpDb = (log: Logger): NeonHttpDatabase<typeof schema> =>
  drizzle(sql, { logger: new DbLogger(log), schema });
