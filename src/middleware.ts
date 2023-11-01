import { authMiddleware } from "@clerk/nextjs";
import createIntlMiddleware from "next-intl/middleware";
import { locales } from "./navigation";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

export default authMiddleware({
  beforeAuth(request) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api")) {
      // don't apply the i18n middleware on TRPC routes
      return;
    }
    return intlMiddleware(request);
  },

  // Ensure that locale specific sign-in pages are public
  publicRoutes: ["/:locale/sign-in(.*)", "/:locale/sign-up(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|_vercel).*)", "/", "/(api)(.*)"],
};
