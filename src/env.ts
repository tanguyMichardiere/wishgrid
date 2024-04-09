import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		// biome-ignore lint/style/useNamingConvention: Environment variable name
		NODE_ENV: z.enum(["development", "production", "test"]),
		// biome-ignore lint/style/useNamingConvention: Environment variable name
		LOG_LEVEL: z.enum(["debug", "info", "warning", "error", "silent"]).default("warning"),

		// biome-ignore lint/style/useNamingConvention: Environment variable name
		AUTH_SECRET: z.string().regex(/[0-9a-f]{64}/),
		// biome-ignore lint/style/useNamingConvention: Environment variable name
		AUTH_DISCORD_ID: z.string(),
		// biome-ignore lint/style/useNamingConvention: Environment variable name
		AUTH_DISCORD_SECRET: z.string(),
		// biome-ignore lint/style/useNamingConvention: Environment variable name
		AUTH_RESEND_KEY: z.string().regex(/^re_[0-9A-Za-z]{8}_[0-9A-Za-z]{24}$/),

		// biome-ignore lint/style/useNamingConvention: Environment variable name
		DATABASE_URL: z.string().url().startsWith("postgresql://"),
	},
	// biome-ignore lint/style/useNamingConvention: Environment variable name
	experimental__runtimeEnv: {},
	emptyStringAsUndefined: true,
});
