const { createEnv } = require("@t3-oss/env-nextjs");
const { z } = require("zod");

const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    DATABASE_URL: z.string().url(),
    DISCORD_CLIENT_ID: z.optional(z.string()),
    DISCORD_CLIENT_SECRET: z.optional(z.string()),
  },
  client: {
    NEXT_PUBLIC_TITLE: z.string(),
    NEXT_PUBLIC_DESCRIPTION: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env["DATABASE_URL"],
    DISCORD_CLIENT_ID: process.env["DISCORD_CLIENT_ID"],
    DISCORD_CLIENT_SECRET: process.env["DISCORD_CLIENT_SECRET"],
    NEXT_PUBLIC_TITLE: process.env["NEXT_PUBLIC_TITLE"],
    NEXT_PUBLIC_DESCRIPTION: process.env["NEXT_PUBLIC_DESCRIPTION"],
  },
});

module.exports = {
  ...env,
  default: env,
};
