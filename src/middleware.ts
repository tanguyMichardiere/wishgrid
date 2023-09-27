import { authMiddleware } from "@clerk/nextjs";
import createIntlMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware({
  locales: ["en", "fr"],
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

  clockSkewInMs: 10000,

  // Ensure that locale specific sign-in pages are public
  publicRoutes: ["/:locale/sign-in(.*)", "/:locale/sign-up(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
