import type { KnipConfig } from "knip";

export default {
  ignore: ["src/i18n.ts", "src/types/messagesAssertions.ts"],
  ignoreDependencies: [
    "eslint-config-next",
    "lorem-ipsum",
    "npm-check-updates",
    "pino-pretty",
    "vercel",
  ],
} satisfies KnipConfig;
