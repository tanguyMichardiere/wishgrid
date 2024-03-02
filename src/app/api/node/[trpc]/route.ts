import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "../../../../server/context";
import { logger } from "../../../../server/logger";
import { nodeRouter } from "../../../../server/nodeRouter";

export const runtime = "nodejs";

async function handler(req: Request): Promise<Response> {
  return fetchRequestHandler({
    endpoint: "/api/node",
    router: nodeRouter,
    req,
    createContext,
    onError({ error }) {
      logger.error(error);
    },
  });
}

export { handler as GET, handler as POST };
