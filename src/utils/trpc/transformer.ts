import type { DataTransformerOptions } from "@trpc/server/unstable-core-do-not-import";
import { uneval } from "devalue";
import superjson from "superjson";

export const transformer = {
  input: superjson,
  output: {
    serialize: uneval,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    deserialize: (object) => eval(`(${String(object)})`),
  },
} satisfies DataTransformerOptions;
