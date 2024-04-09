import type { NamespaceKeys, NestedKeyOf } from "next-intl";
import { useTranslations } from "next-intl";
import type { IntlMessages } from "../../types/messages";

export function useClientTranslations<
	NameSpace extends NamespaceKeys<IntlMessages, NestedKeyOf<IntlMessages>>,
>(namespace: NameSpace & `client.${string}`): ReturnType<typeof useTranslations<NameSpace>> {
	return useTranslations(namespace);
}
