import type { KnipConfig } from "knip";

export default {
  ignore: ["**/*.d.ts", "*.config.ts"],
  ignoreDependencies: [
    "@total-typescript/ts-reset",
    "eslint-config-next",
    "lorem-ipsum",
    "npm-check-updates",
    "vercel",
  ],
} satisfies KnipConfig;
