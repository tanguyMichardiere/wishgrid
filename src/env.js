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
    AUTH_EMAIL_SERVER: z
      .string()
      .url()
      // @ts-expect-error crashes immediately if incorrect
      .default(process.env.NODE_ENV === "development" ? process.env["VERCEL_URL"] : undefined),
    // @ts-expect-error crashes immediately if incorrect
    AUTH_EMAIL_FROM: z.string().default(process.env.NODE_ENV === "development" ? "" : undefined),

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
    AUTH_EMAIL_SERVER: process.env["AUTH_EMAIL_SERVER"],
    AUTH_EMAIL_FROM: process.env["AUTH_EMAIL_FROM"],

    DATABASE_URL: process.env["DATABASE_URL"],
    DATABASE_DIRECT_URL: process.env["DATABASE_DIRECT_URL"],
  },
});

module.exports = {
  ...env,
  default: env,
};
