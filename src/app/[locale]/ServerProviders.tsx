import { enUS, frFR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import type { ReactNode } from "react";

const localization = {
  en: enUS,
  fr: frFR,
};

type Props = {
  children: ReactNode;
};

export default function ServerProviders(props: Props): JSX.Element {
  const locale = useLocale();

  return (
    <ClerkProvider
      appearance={{
        elements: {
          // fix for white on white text in form input fields in dark mode
          formFieldInput: "dark:bg-[rgba(70,90,126,0.4)]",
        },
      }}
      localization={localization[locale]}
    >
      {props.children}
    </ClerkProvider>
  );
}
