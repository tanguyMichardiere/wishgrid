import createIntlMiddleware from "next-intl/middleware";
import { locales } from "./navigation";

export default createIntlMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
