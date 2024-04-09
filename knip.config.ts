import type { KnipConfig } from "knip";

export default {
	ignore: ["src/i18n.ts", "src/types/messages-assertions.ts"],
	ignoreDependencies: ["npm-check-updates"],
} satisfies KnipConfig;
