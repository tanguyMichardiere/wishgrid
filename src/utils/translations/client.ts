import type { NamespaceKeys, NestedKeyOf } from "next-intl";
import { useTranslations } from "next-intl";

export function useClientTranslations<
  NS extends NamespaceKeys<IntlMessages, NestedKeyOf<IntlMessages>>,
>(namespace: NS & `client.${string}`): ReturnType<typeof useTranslations<NS>> {
  return useTranslations(namespace);
}
