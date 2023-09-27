const { createEnv } = require("@t3-oss/env-nextjs");
const { z } = require("zod");

const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    DATABASE_URL: z.string().url(),
    CLERK_SECRET_KEY: z.string(),
    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
      .default("info"),

    PORT: z.coerce.number().int().positive().default(3000),
    VERCEL_URL: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env["DATABASE_URL"],
    CLERK_SECRET_KEY: process.env["CLERK_SECRET_KEY"],
    LOG_LEVEL: process.env["LOG_LEVEL"],

    PORT: process.env["PORT"],
    VERCEL_URL: process.env["VERCEL_URL"],

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"],
  },
});

module.exports = {
  ...env,
  default: env,
};
