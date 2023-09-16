import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en"],
  defaultLocale: "en",
});

export default authMiddleware({
  beforeAuth(request) {
    return intlMiddleware(request);
  },

  // Ensure that locale specific sign-in pages are public
  publicRoutes: ["/", "/:locale/sign-in"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
