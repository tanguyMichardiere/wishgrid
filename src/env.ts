import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    LOG_LEVEL: z.enum(["debug", "info", "warning", "error", "silent"]).default("warning"),

    AUTH_SECRET: z.string().regex(/[0-9a-f]{64}/),
    AUTH_DISCORD_ID: z.string(),
    AUTH_DISCORD_SECRET: z.string(),
    AUTH_RESEND_KEY: z.string().regex(/^re_[0-9A-Za-z]{8}_[0-9A-Za-z]{24}$/),

    DATABASE_URL: z.string().url().startsWith("postgresql://"),
  },
  // eslint-disable-next-line camelcase
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
});
