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
    onError({ path, input, error }) {
      logger.error({ context: "trpcNode", input, error }, path);
    },
  });
}

export { handler as GET, handler as POST };
