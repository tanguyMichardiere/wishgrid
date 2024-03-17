import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import en from "../messages/en.json";
import fr from "../messages/fr.json";
import { locales } from "./navigation";

const messages = { en, fr };

function checkLocale(locale: string): asserts locale is Locale {
  if (!locales.includes(locale)) {
    notFound();
  }
}

export default getRequestConfig(function ({ locale }) {
  checkLocale(locale);
  return { messages: messages[locale] };
});
