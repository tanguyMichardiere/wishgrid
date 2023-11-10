import type { KnipConfig } from "knip";

export default {
  ignore: ["src/i18n.ts", "src/types/messagesAssertions.ts", "headers.config.js"],
  ignoreDependencies: [
    "eslint-config-next",
    "lorem-ipsum",
    "npm-check-updates",
    "pino-pretty",
    "vercel",
  ],
} satisfies KnipConfig;
