import "next-intl";

declare module "next-intl" {
  declare function useLocale(): Locale;

  declare function useMessages(): Messages;
}
