import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createContext } from "../../../server/context";
import { router } from "../../../server/router";

export default createNextApiHandler({
  router,
  createContext,
});
