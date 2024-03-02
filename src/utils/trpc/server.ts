import { createTRPCClient, httpLink } from "@trpc/client";
import { createServerSideHelpers as _createServerSideHelpers } from "@trpc/react-query/server";
import { cookies, headers } from "next/headers";
import "server-only";
import { createContext } from "../../server/context";
import type { NodeRouter } from "../../server/nodeRouter";
import type { Router } from "../../server/router";
import { router } from "../../server/router";
import { transformer } from "./transformer";

export const createServerSideHelpers = async (): Promise<
  ReturnType<typeof _createServerSideHelpers<Router>>
> => _createServerSideHelpers({ router, ctx: await createContext(), transformer });

export function createNodeClient(): ReturnType<typeof createTRPCClient<NodeRouter>> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const originHeader = headers().get("origin")!;
  console.log(originHeader);
  const authCookie = cookies().get("authjs.session-token");
  return createTRPCClient<NodeRouter>({
    links: [
      httpLink({
        url: `${originHeader}/api/node`,
        headers() {
          if (authCookie !== undefined) {
            return { Cookie: `${authCookie.name}=${authCookie.value}` };
          }
          return {};
        },
        transformer,
      }),
    ],
  });
}
