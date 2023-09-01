const { createEnv } = require("@t3-oss/env-nextjs");
const { z } = require("zod");

const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    DATABASE_URL: z.string().url(),
    CLERK_SECRET_KEY: z.string(),

    PORT: z.coerce.number().int().positive().optional(),
    VERCEL_URL: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_TITLE: z.string(),
    NEXT_PUBLIC_DESCRIPTION: z.string(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env["DATABASE_URL"],
    CLERK_SECRET_KEY: process.env["CLERK_SECRET_KEY"],
    PORT: process.env["PORT"],
    VERCEL_URL: process.env["VERCEL_URL"],
    NEXT_PUBLIC_TITLE: process.env["NEXT_PUBLIC_TITLE"],
    NEXT_PUBLIC_DESCRIPTION: process.env["NEXT_PUBLIC_DESCRIPTION"],
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"],
  },
});

module.exports = {
  ...env,
  default: env,
};
