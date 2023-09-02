import { createServerSideHelpers as _createServerSideHelpers } from "@trpc/react-query/server";
import "server-only";
import SuperJSON from "superjson";
import { createContext } from "../../server/context";
import type { Router } from "../../server/router";
import { router } from "../../server/router";

export async function createServerSideHelpers(): Promise<
  ReturnType<typeof _createServerSideHelpers<Router>>
> {
  return _createServerSideHelpers({
    router: router,
    ctx: await createContext(),
    transformer: SuperJSON,
  });
}
