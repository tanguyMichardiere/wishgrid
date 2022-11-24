import type { AppProps } from "next/app";
import Link from "next/link";

import { Inter } from "@next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { cx } from "classix";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import ErrorBoundary from "../components/ErrorBoundary";

import "../styles.css";
import { trpc } from "../utils/trpc";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function locationReload() {
  location.reload();
}

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session?: Session | null }>) {
  return (
    <>
      <meta content="initial-scale=1, width=device-width" name="viewport" />
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ErrorBoundary
          fallback={
            <div className="flex h-full flex-col items-center justify-center">
              <h2>An expected error has occurred, it has been reported</h2>
              <Link href="/">Home Page</Link>
              <button onClick={locationReload} type="button">
                Reload
              </button>
            </div>
          }
        >
          <SessionProvider session={session}>
            <ReactQueryDevtools />
            <main className={cx(inter.variable, "h-full font-sans")}>
              <Component {...pageProps} />
            </main>
          </SessionProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
}

export default trpc.withTRPC(App);

export { reportWebVitals } from "next-axiom";
