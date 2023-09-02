import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "../../../server/context";
import { router } from "../../../server/router";

export const runtime = "edge";

async function handler(req: Request): Promise<Response> {
  return fetchRequestHandler({
    endpoint: "/api",
    router,
    req,
    createContext,
  });
}

export { handler as GET, handler as POST };
