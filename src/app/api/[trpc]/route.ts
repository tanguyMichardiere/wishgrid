import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "../../../server/context";
import { logger } from "../../../server/logger";
import { router } from "../../../server/router";

// export const runtime = "edge";

async function handler(req: Request): Promise<Response> {
  return fetchRequestHandler({
    endpoint: "/api",
    router,
    req,
    createContext: createContext,
    onError({ path, input, error }) {
      logger.error({ input, error }, path);
    },
  });
}

export { handler as GET, handler as POST };
