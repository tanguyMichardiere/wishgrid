import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
      .default("info"),

    NEXTAUTH_URL: z.string().url(),
    AUTH_SECRET: z.string().regex(/[0-9a-f]{64}/),
    AUTH_DISCORD_ID: z.string(),
    AUTH_DISCORD_SECRET: z.string(),
    AUTH_EMAIL_SERVER: z.string().url().startsWith("smtp://"),
    AUTH_EMAIL_FROM: z.string(),

    DATABASE_URL: z.string().url().startsWith("postgresql://"),
    DATABASE_DIRECT_URL: z.string().url().startsWith("postgresql://"),
  },
  // eslint-disable-next-line camelcase
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
});
