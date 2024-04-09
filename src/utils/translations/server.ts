import type { NamespaceKeys, NestedKeyOf } from "next-intl";
import { useTranslations } from "next-intl";
import "server-only";
import type { IntlMessages } from "../../types/messages";

export function useServerTranslations<
	NameSpace extends NamespaceKeys<IntlMessages, NestedKeyOf<IntlMessages>>,
>(namespace: NameSpace): ReturnType<typeof useTranslations<NameSpace>> {
	return useTranslations(namespace);
}
