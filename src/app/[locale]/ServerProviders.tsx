import { enUS, frFR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import type { ReactNode } from "react";

const clerkLocalization = {
  en: enUS,
  fr: frFR,
};

type Props = {
  children: ReactNode;
};

export default function ServerProviders(props: Props): JSX.Element {
  const locale = useLocale();

  const { client } = useMessages();

  return (
    <ClerkProvider
      appearance={{
        elements: {
          // fix for white on white text in form input fields in dark mode
          formFieldInput: "dark:bg-[rgba(70,90,126,0.4)]",
        },
      }}
      localization={clerkLocalization[locale]}
    >
      <NextIntlClientProvider
        locale={locale}
        messages={{ client }}
        now={new Date()}
        timeZone="Europe/Paris"
      >
        {props.children}
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
