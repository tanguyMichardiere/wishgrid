"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export function ClientProviders(props: Props): JSX.Element {
  return (
    <ThemeProvider attribute="data-theme" disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        {props.children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
