import cx from "classix";
import { useLocale } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../../styles.css";
import ClientProviders from "./ClientProviders";
import ServerProviders from "./ServerProviders";
import type { Params } from "./params";

export const runtime = "nodejs";

export const metadata = {
  title: "WishGrid",
  description: "Personal wishlists",
  icons: [
    "/favicon.ico",
    { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    { url: "/favicon-96.png", type: "image/png", sizes: "96x96" },
  ],
};

type Props = {
  params: Params;
  children: ReactNode;
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout(props: Props): JSX.Element {
  const locale = useLocale();

  if (props.params.locale !== locale) {
    notFound();
  }

  return (
    <ServerProviders>
      <html className="h-full" lang={locale} suppressHydrationWarning>
        <body className={cx(inter.variable, "h-full font-sans")}>
          {/* @ts-expect-error incorrect types on trpc.withTRPC */}
          <ClientProviders>{props.children}</ClientProviders>
        </body>
      </html>
    </ServerProviders>
  );
}
