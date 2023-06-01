#!/usr/bin/env node
const { Pool } = require("pg");
const { loadEnvConfig } = require("@next/env");
const { drizzle } = require("drizzle-orm/neon-serverless");
const { migrate } = require("drizzle-orm/neon-serverless/migrator");

loadEnvConfig(process.cwd());

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: true });
const db = drizzle(pool);
migrate(db, { migrationsFolder: "./drizzle" });
