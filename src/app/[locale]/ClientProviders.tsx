"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { trpc } from "../../utils/trpc/client";

type Props = {
  children: ReactNode;
};

export default trpc.withTRPC(function ClientProviders(props: Props) {
  return (
    <ThemeProvider attribute="data-theme" disableTransitionOnChange>
      <Toaster position="top-center" />
      {props.children}
      <ReactQueryDevtools />
    </ThemeProvider>
  );
});
