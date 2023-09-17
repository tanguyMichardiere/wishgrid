import type { KnipConfig } from "knip";

export default {
  ignore: ["**/*.d.ts", "*.config.ts", "i18n.ts"],
  ignoreDependencies: ["eslint-config-next", "lorem-ipsum", "npm-check-updates", "vercel"],
} satisfies KnipConfig;
