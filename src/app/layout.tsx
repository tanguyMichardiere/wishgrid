import cx from "classix";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { NEXT_PUBLIC_DESCRIPTION, NEXT_PUBLIC_TITLE } from "../env";
import "../styles.css";
import ClientProviders from "./ClientProviders";
import ServerProviders from "./ServerProviders";

export const runtime = "edge";

export const metadata = {
  title: NEXT_PUBLIC_TITLE,
  description: NEXT_PUBLIC_DESCRIPTION,
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
          {/* @ts-expect-error incorrect types on trpc.withTRPC */}
          <ClientProviders>{props.children}</ClientProviders>
        </body>
      </html>
    </ServerProviders>
  );
}
