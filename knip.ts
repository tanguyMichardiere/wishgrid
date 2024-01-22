import type { KnipConfig } from "knip";

export default {
  ignore: ["src/i18n.ts", "src/types/messagesAssertions.ts", "headers.config.js"],
  ignoreDependencies: ["npm-check-updates", "pino-pretty"],
} satisfies KnipConfig;
