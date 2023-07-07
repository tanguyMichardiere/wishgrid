"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export function ClientProviders(props: Props): JSX.Element {
  return (
    <ThemeProvider attribute="data-theme" disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </ThemeProvider>
  );
}
