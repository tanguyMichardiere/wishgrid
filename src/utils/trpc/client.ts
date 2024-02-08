import { unstable_httpBatchStreamLink as httpBatchStreamLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import "client-only";
import SuperJSON from "superjson";
import type { Router } from "../../server/router";

export const trpc = createTRPCNext<Router>({
  transformer: SuperJSON,
  config() {
    return {
      links: [
        httpBatchStreamLink({
          url: "/api",
          transformer: SuperJSON,
        }),
      ],
      abortOnUnmount: true,
    };
  },
});
