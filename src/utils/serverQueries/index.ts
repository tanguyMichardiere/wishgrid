import { TRPCError } from "@trpc/server";
import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
import { headers } from "next/headers";
import { cache } from "react";
import "server-only";
import { redirect } from "../../navigation";
import { createServerSideHelpers } from "../trpc/server";

const linkRegex = /<(?<url>\S+)>; rel="(?<rel>\S+)"; hreflang="(?<hreflang>\S+)"/g;
type LinkRegexGroups = { url: string; rel: string; hreflang: string };

function getRequestPathname(): string | undefined {
  try {
    const linkHeader = headers().get("link");
    if (linkHeader === null) {
      return undefined;
    }
    const locale = headers().get("x-next-intl-locale") ?? "x-default";
    for (const match of linkHeader.matchAll(linkRegex)) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const { url, hreflang } = match.groups as LinkRegexGroups;
      if (hreflang === locale) {
        const { pathname } = new URL(url);
        // TODO: something (next-intl?) removes "fr" at the start of "friends"
        if (pathname.startsWith("/iend/") || pathname.startsWith("/fr/iend/")) {
          pathname.replace("/iend/", "/friend/");
        }
        return pathname;
      }
    }
    return undefined;
  } catch {
    return undefined;
  }
}

export const serverQuery = <P extends Array<unknown>, R>(
  fn: (trpc: Awaited<ReturnType<typeof createServerSideHelpers>>, ...args: P) => Promise<R>,
  errors: Partial<Record<TRPC_ERROR_CODE_KEY, (error: TRPCError) => R>> = {},
): ((...args: P) => Promise<R>) =>
  cache(async function (...args: P) {
    const trpc = await createServerSideHelpers();
    try {
      return await fn(trpc, ...args);
    } catch (error) {
      if (error instanceof TRPCError) {
        if (error.code === "UNAUTHORIZED") {
          const requestPathname = getRequestPathname();
          if (requestPathname !== undefined) {
            redirect(`/sign-in?redirectTo=${encodeURIComponent(requestPathname)}`);
          } else {
            redirect("/sign-in");
          }
        }
        const handler = errors[error.code];
        if (handler !== undefined) {
          return handler(error);
        }
      }
      throw error;
    }
  });
