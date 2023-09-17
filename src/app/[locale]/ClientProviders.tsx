"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiomWebVitals } from "next-axiom";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import ClientComponentsMessagesProvider from "../../context/clientComponentsMessages/provider";
import { trpc } from "../../utils/trpc/client";

type Props = {
  children: ReactNode;
  clientComponentsMessages: Messages["ClientComponents"];
};

export default trpc.withTRPC(function ClientProviders(props: Props): JSX.Element {
  return (
    <ThemeProvider attribute="data-theme" disableTransitionOnChange>
      <ClientComponentsMessagesProvider messages={props.clientComponentsMessages}>
        <AxiomWebVitals />
        {props.children}
        <ReactQueryDevtools initialIsOpen />
      </ClientComponentsMessagesProvider>
    </ThemeProvider>
  );
});
