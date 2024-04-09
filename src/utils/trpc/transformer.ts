import type { DataTransformerOptions } from "@trpc/server/unstable-core-do-not-import";
import { uneval } from "devalue";
import superjson from "superjson";

export const transformer = {
	input: superjson,
	output: {
		serialize: uneval,
		// biome-ignore lint/security/noGlobalEval: only run with code from TRPC
		deserialize: (object) => eval(`(${String(object)})`),
	},
} satisfies DataTransformerOptions;
