import { createTRPCClient, httpLink } from "@trpc/client";
import { createServerSideHelpers as _createServerSideHelpers } from "@trpc/react-query/server";
import { cookies } from "next/headers";
import "server-only";
import { createContext } from "../../server/context";
import type { NodeRouter } from "../../server/nodeRouter";
import type { Router } from "../../server/router";
import { router } from "../../server/router";
import { transformer } from "./transformer";

export const createServerSideHelpers = async (): Promise<
  ReturnType<typeof _createServerSideHelpers<Router>>
> =>
  _createServerSideHelpers({
    router,
    ctx: await createContext(),
    transformer,
  });

export const trpcNode = createTRPCClient<NodeRouter>({
  links: [
    httpLink({
      url: "http://localhost:3000/api/node",
      transformer,
      headers() {
        const authCookie = cookies().get("authjs.session-token");
        if (authCookie !== undefined) {
          return { Cookie: `${authCookie.name}=${authCookie.value}` };
        }
        return {};
      },
    }),
  ],
});
