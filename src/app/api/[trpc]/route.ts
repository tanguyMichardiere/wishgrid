import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "../../../server/context";
import { logger } from "../../../server/logger";
import { router } from "../../../server/router";

async function handler(req: Request): Promise<Response> {
  return fetchRequestHandler({
    endpoint: "/api",
    router,
    req,
    createContext,
    onError({ error }) {
      logger.error(error);
    },
  });
}

export { handler as GET, handler as POST };
