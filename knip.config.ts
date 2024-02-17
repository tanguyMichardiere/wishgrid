import type { KnipConfig } from "knip";

export default {
  ignore: ["src/i18n.ts", "src/types/messagesAssertions.ts"],
  ignoreDependencies: ["@vercel/nft", "npm-check-updates", "pino-pretty"],
} satisfies KnipConfig;
