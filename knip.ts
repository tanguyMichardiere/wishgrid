import type { KnipConfig } from "knip";

export default {
  ignore: ["i18n.ts"],
  ignoreDependencies: ["eslint-config-next", "lorem-ipsum", "npm-check-updates", "vercel"],
} satisfies KnipConfig;
