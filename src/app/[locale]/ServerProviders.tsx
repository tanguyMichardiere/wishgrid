import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import type { JSX, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { auth } from "../../auth";

type Props = {
  children: ReactNode;
};

export default async function ServerProviders(props: Props): Promise<JSX.Element> {
  const session = await auth();
  const locale = useLocale();
  const { client } = await getMessages();

  return (
    <SessionProvider session={session}>
      <NextIntlClientProvider
        locale={locale}
        messages={{ client }}
        now={new Date()}
        timeZone="Europe/Paris"
      >
        <Toaster position="top-center" />
        {props.children}
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
