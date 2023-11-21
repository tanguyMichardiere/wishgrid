import createIntlMiddleware from "next-intl/middleware";
// import { auth } from "./auth";
import type { NextRequest, NextResponse } from "next/server";
import { locales } from "./navigation";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

export function middleware(request: NextRequest): NextResponse | undefined {
  // export const middleware = auth(function (request) {
  const url = new URL(request.url);
  if (url.pathname.startsWith("/api")) {
    // don't apply the i18n middleware on TRPC routes
    return;
  }
  return intlMiddleware(request);
  // });
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|_vercel).*)", "/", "/(api)(.*)"],
};
