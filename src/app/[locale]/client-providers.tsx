"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { trpc } from "../../utils/trpc/client";

type Props = { children: ReactNode };

export const ClientProviders = trpc.withTRPC(function ClientProviders(props: Props) {
	return (
		<ThemeProvider attribute="data-theme" disableTransitionOnChange={true}>
			{props.children}
			<ReactQueryDevtools />
		</ThemeProvider>
	);
});
