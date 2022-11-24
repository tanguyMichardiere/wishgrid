const { z } = require("zod");

const ServerEnv = z.object({
  DATABASE_URL: z.string().url(),

  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z
    .string()
    .url()
    // allow VERCEL_URL as a default value
    .default(() =>
      z
        .preprocess((arg) => (typeof arg === "string" ? `https://${arg}` : arg), z.string().url())
        .parse(process.env["VERCEL_URL"])
    ),
});

const ClientEnv = z.object({
  NEXT_PUBLIC_TITLE: z.string(),
  NEXT_PUBLIC_DESCRIPTION: z.string(),
});

// we have to unpack process.env manually so Next.js includes the values in the client build
/** @type {{ [K in keyof z.infer<typeof ClientEnv>]: z.infer<typeof ClientEnv>[K] | undefined }} */
const clientEnv = {
  NEXT_PUBLIC_TITLE: process.env["NEXT_PUBLIC_TITLE"],
  NEXT_PUBLIC_DESCRIPTION: process.env["NEXT_PUBLIC_DESCRIPTION"],
};

/**
 * @param {z.SafeParseReturnType<Record<string, string>, Record<string, string>>} result
 * @returns {asserts result is z.SafeParseSuccess<Record<string, string>>}
 */
function handleErrors(result) {
  if (!result.success) {
    throw new Error(
      `Invalid environment variables\n${Object.entries(result.error.format())
        .filter(([name]) => name !== "_errors")
        .map(function ([name, value]) {
          if (value !== undefined) {
            if ("_errors" in value) {
              if (value._errors.length > 0) {
                return `${name}: ${value._errors.join(", ")}`;
              }
            } else if (value.length > 0) {
              return `${name}: ${value.join(", ")}`;
            }
          }
          return name;
        })
        .join("\n")}`
    );
  }
}

module.exports = {
  ServerEnv,
  ClientEnv,
  clientEnv,
  handleErrors,
};
