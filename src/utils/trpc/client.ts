import { httpLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import "client-only";
import SuperJSON from "superjson";
import { PORT, VERCEL_URL } from "../../env";
import type { Router } from "../../server/router";

function getBaseUrl() {
  if (typeof window !== "undefined") {
    // browser should use relative path
    return "";
  }
  if (VERCEL_URL !== undefined) {
    // reference for vercel.com
    return `https://${VERCEL_URL}`;
  }
  // assume localhost
  return `http://localhost:${PORT}`;
}

export const trpc = createTRPCNext<Router>({
  config() {
    return {
      links: [
        httpLink({
          url: `${getBaseUrl()}/api`,
        }),
      ],
      transformer: SuperJSON,
      abortOnUnmount: true,
    };
  },
});
