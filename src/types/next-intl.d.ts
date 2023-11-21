import "next-intl";

declare module "next-intl" {
  declare function useLocale(): Locale;
}

declare module "next-intl/server" {
  declare function getMessages(): Promise<Messages>;
}
