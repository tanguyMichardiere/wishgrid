import createIntlMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales } from "./navigation";

export default createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
