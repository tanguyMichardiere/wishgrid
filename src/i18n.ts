import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import en from "../messages/en.json";
import fr from "../messages/fr.json";
import { locales } from "./navigation";
import type { Locale } from "./types/locale";

const messages = {
	en,
	fr,
};

function checkLocale(locale: string): asserts locale is Locale {
	if (!locales.includes(locale)) {
		notFound();
	}
}

// biome-ignore lint/style/noDefaultExport: required by next-intl
export default getRequestConfig(({ locale }) => {
	checkLocale(locale);
	return { messages: messages[locale] };
});
