"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { trpc } from "../utils/trpc/client";

type Props = {
  children: ReactNode;
};

export default trpc.withTRPC(function ClientProviders(props: Props): JSX.Element {
  return (
    <ThemeProvider attribute="data-theme" disableTransitionOnChange>
      {props.children}
      <ReactQueryDevtools initialIsOpen />
    </ThemeProvider>
  );
});
