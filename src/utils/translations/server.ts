import type { NamespaceKeys, NestedKeyOf } from "next-intl";
import { useTranslations } from "next-intl";
import "server-only";
import type { IntlMessages } from "../../types/messages";

export function useServerTranslations<
  NS extends NamespaceKeys<IntlMessages, NestedKeyOf<IntlMessages>>,
>(namespace: NS): ReturnType<typeof useTranslations<NS>> {
  return useTranslations(namespace);
}
