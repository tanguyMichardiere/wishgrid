import type { NamespaceKeys, NestedKeyOf } from "next-intl";
import { useTranslations } from "next-intl";
import type { IntlMessages } from "../../types/messages";

export function useClientTranslations<
  NS extends NamespaceKeys<IntlMessages, NestedKeyOf<IntlMessages>>,
>(namespace: NS & `clientComponents.${string}`): ReturnType<typeof useTranslations<NS>> {
  return useTranslations(namespace);
}
