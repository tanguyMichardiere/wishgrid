import type { KnipConfig } from "knip";

export default {
	ignore: ["scripts/*.mjs", "src/i18n/request.ts", "src/types/messages-assertions.ts"],
	ignoreDependencies: [
		"@tailwindcss/container-queries",
		"@tailwindcss/forms",
		"@tailwindcss/typography",
		"daisyui",
		"npm-check-updates",
		"postcss",
		"tailwindcss",
	],
} satisfies KnipConfig;
