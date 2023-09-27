import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { log } from "next-axiom";
import { createContext } from "../../../server/context";
import { router } from "../../../server/router";

// export const runtime = "edge";

async function handler(req: Request): Promise<Response> {
  return fetchRequestHandler({
    endpoint: "/api",
    router,
    req,
    createContext,
    onError({ path, input, error }) {
      log.error(path ?? "", { input, error });
    },
  });
}

export { handler as GET, handler as POST };
