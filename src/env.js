const { createEnv } = require("@t3-oss/env-nextjs");
const { z } = require("zod");

const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
      .default("info"),
    PORT: z.coerce.number().int().positive().default(3000),
    VERCEL_URL: z.string().optional(),

    AUTH_SECRET: z.string().regex(/[0-9a-f]{64}/),
    AUTH_DISCORD_ID: z.string(),
    AUTH_DISCORD_SECRET: z.string(),
    // SENDGRID_API_KEY: z.string(),

    DATABASE_URL: z.string().url(),
    DATABASE_DIRECT_URL: z.string().url(),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: process.env["LOG_LEVEL"],
    PORT: process.env["PORT"],
    VERCEL_URL: process.env["VERCEL_URL"],

    AUTH_SECRET: process.env["AUTH_SECRET"],
    AUTH_DISCORD_ID: process.env["AUTH_DISCORD_ID"],
    AUTH_DISCORD_SECRET: process.env["AUTH_DISCORD_SECRET"],
    // SENDGRID_API_KEY: process.env["SENDGRID_API_KEY"],

    DATABASE_URL: process.env["DATABASE_URL"],
    DATABASE_DIRECT_URL: process.env["DATABASE_DIRECT_URL"],
  },
});

module.exports = {
  ...env,
  default: env,
};
