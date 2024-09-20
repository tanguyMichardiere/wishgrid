import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [
		// biome-ignore lint/nursery/noCommonJs:
		require("@tailwindcss/typography"),
		// biome-ignore lint/nursery/noCommonJs:
		require("@tailwindcss/forms"),
		// biome-ignore lint/nursery/noCommonJs:
		require("@tailwindcss/container-queries"),
		// biome-ignore lint/nursery/noCommonJs:
		require("daisyui"),
	],
	daisyui: {
		logs: false,
		themes: [
			"light",
			"dark",
			"cupcake",
			"bumblebee",
			"emerald",
			"corporate",
			"synthwave",
			"retro",
			"cyberpunk",
			"valentine",
			"halloween",
			"garden",
			"forest",
			"aqua",
			"lofi",
			"pastel",
			"fantasy",
			"wireframe",
			"black",
			"luxury",
			"dracula",
			"cmyk",
			"autumn",
			"business",
			"acid",
			"lemonade",
			"night",
			"coffee",
			"winter",
			"dim",
			"nord",
			"sunset",
		],
	},
} satisfies Config;
