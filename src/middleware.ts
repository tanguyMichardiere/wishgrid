import createIntlMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales } from "./navigation";

// biome-ignore lint/style/noDefaultExport: required by next
export default createIntlMiddleware({
	locales,
	defaultLocale,
	localePrefix,
});

export const config = {
	matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
