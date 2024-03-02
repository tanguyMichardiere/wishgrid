import { unstable_httpBatchStreamLink as httpBatchStreamLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import "client-only";
import type { Router } from "../../server/router";
import { transformer } from "./transformer";

export const trpc = createTRPCNext<Router>({
  transformer,
  config() {
    return {
      links: [httpBatchStreamLink({ url: "/api", transformer })],
      abortOnUnmount: true,
    };
  },
});
