import cx from "classix";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { variable } from "../font";
import ClientProviders from "./ClientProviders";
import ServerProviders from "./ServerProviders";
import type { Params } from "./params";

type Props = {
  params: Params;
  children: ReactNode;
};

export default function LocaleLayout(props: Props): JSX.Element {
  const locale = useLocale();

  if (props.params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cx(variable, "font-sans")}>
        <ServerProviders>
          {/* @ts-expect-error incorrect types on trpc.withTRPC */}
          <ClientProviders>{props.children}</ClientProviders>
        </ServerProviders>
      </body>
    </html>
  );
}
