import "next-intl";
import type { Locale } from "./locale";
import type { Messages } from "./messages";

declare module "next-intl" {
	declare function useLocale(): Locale;
}

declare module "next-intl/server" {
	declare function getMessages(): Promise<Messages>;
}
