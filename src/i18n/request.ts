import { getRequestConfig } from "next-intl/server";
import en from "../../messages/en.json";
import fr from "../../messages/fr.json";
import { routing } from "./routing";

const messages = {
	en,
	fr,
};

function sanitizeLocale(locale: string | undefined): (typeof routing.locales)[number] {
	if (locale !== undefined && routing.locales.includes(locale)) {
		return locale as (typeof routing.locales)[number];
	}
	return routing.defaultLocale;
}

// biome-ignore lint/style/noDefaultExport:
export default getRequestConfig(async ({ requestLocale }) => {
	const locale = sanitizeLocale(await requestLocale);
	return {
		locale,
		messages: messages[locale],
	};
});
