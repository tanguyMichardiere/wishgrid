import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest, NextResponse } from "next/server";
import { locales } from "./navigation";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export function middleware(request: NextRequest): NextResponse | undefined {
  const url = new URL(request.url);
  if (url.pathname.startsWith("/api")) {
    // don't apply the i18n middleware on TRPC routes
    return;
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|_vercel).*)", "/", "/(api)(.*)"],
};
