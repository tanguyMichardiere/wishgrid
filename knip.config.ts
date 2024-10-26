import type { KnipConfig } from "knip";

export default {
	ignore: ["scripts/*.mjs", "src/i18n/request.ts", "src/types/messages-assertions.ts"],
	ignoreDependencies: ["npm-check-updates"],
} satisfies KnipConfig;
