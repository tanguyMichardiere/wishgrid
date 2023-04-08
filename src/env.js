const { z } = require("zod");

const server = z.object({
  NODE_ENV: z.enum(["production", "development", "test"]),
  DATABASE_URL: z.string().url(),
  DISCORD_CLIENT_ID: z.optional(z.string()),
  DISCORD_CLIENT_SECRET: z.optional(z.string()),
});

const client = z.object({
  NEXT_PUBLIC_TITLE: z.string(),
  NEXT_PUBLIC_DESCRIPTION: z.string(),
});

/** @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>} */
const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env["DATABASE_URL"],
  DISCORD_CLIENT_ID: process.env["DISCORD_CLIENT_ID"],
  DISCORD_CLIENT_SECRET: process.env["DISCORD_CLIENT_SECRET"],
  NEXT_PUBLIC_TITLE: process.env["NEXT_PUBLIC_TITLE"],
  NEXT_PUBLIC_DESCRIPTION: process.env["NEXT_PUBLIC_DESCRIPTION"],
};

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env);

if (Boolean(process.env["SKIP_ENV_VALIDATION"]) == false) {
  const isServer = typeof window === "undefined";

  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer ? merged.safeParse(processEnv) : client.safeParse(processEnv)
  );

  if (parsed.success === false) {
    // eslint-disable-next-line no-console
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        );
      return target[/** @type {keyof typeof target} */ (prop)];
    },
  });
}

module.exports = {
  ...env,
  default: env,
};
