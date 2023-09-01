import { Pool } from "@neondatabase/serverless";
import "server-only";
import { DATABASE_URL } from "../../env";

export const pool = new Pool({ connectionString: DATABASE_URL });
