import { createTRPCNext } from "@trpc/next";
import { httpBatchLink } from "@trpc/react-query";
import SuperJSON from "superjson";
import type { Router } from "../server/router";

export const trpc = createTRPCNext<Router>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
      transformer: SuperJSON,
    };
  },
});
