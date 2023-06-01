import cx from "classix";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "../styles.css";
import { ClientProviders } from "./ClientProviders";
import { ServerProviders } from "./ServerProviders";

export const runtime = "edge";

export const metadata = {
  title: "WishGrid",
  description: "Personal wishlists",
};

type Props = {
  children: ReactNode;
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout(props: Props): JSX.Element {
  return (
    <ServerProviders>
      <html className="h-full" lang="en" suppressHydrationWarning>
        <body className={cx(inter.variable, "h-full font-sans")}>
          <ClientProviders>{props.children}</ClientProviders>
        </body>
      </html>
    </ServerProviders>
  );
}
