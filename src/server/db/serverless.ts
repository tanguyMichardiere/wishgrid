import { Pool } from "@neondatabase/serverless";
import type { NeonDatabase } from "drizzle-orm/neon-serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import type { Logger } from "next-axiom";
import "server-only";
import { DATABASE_URL } from "../../env";
import { DbLogger } from "./logger";
import { schema } from "./schema";

const pool = new Pool({ connectionString: DATABASE_URL });

export const createServerlessDb = (log: Logger): NeonDatabase<typeof schema> =>
  drizzle(pool, { logger: new DbLogger(log), schema });
