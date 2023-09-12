import cx from "classix";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "../styles.css";
import ClientProviders from "./ClientProviders";
import ServerProviders from "./ServerProviders";

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
