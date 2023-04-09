import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { cx } from "classix";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Link from "next/link";
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
      <ThemeProvider attribute="data-theme" disableTransitionOnChange>
        <ErrorBoundary
          fallback={
            <div className="flex h-full flex-col items-center justify-center">
              <h2>An expected error has occurred, it has been reported</h2>
              <Link href="/">Home Page</Link>
              <button className="btn" onClick={locationReload} type="button">
                Reload
              </button>
            </div>
          }
        >
          <SessionProvider session={session}>
            <ReactQueryDevtools />
            <main className={cx(inter.variable, "px-2 font-sans")}>
              <Component {...pageProps} session={session} />
            </main>
          </SessionProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
}

export default trpc.withTRPC(App);

export { reportWebVitals } from "next-axiom";
