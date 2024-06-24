import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import cx from "classix";
import { useLocale } from "next-intl";
import type { JSX, ReactNode } from "react";
import { variable } from "../font";
import { ClientProviders } from "./client-providers";
import { ServerProviders } from "./server-providers";

type Props = { children: ReactNode };

export default function LocaleLayout(props: Props): JSX.Element {
	const locale = useLocale();

	return (
		<html lang={locale} suppressHydrationWarning={true}>
			<Analytics />
			<SpeedInsights />
			<body className={cx(variable, "font-sans")}>
				<ServerProviders>
					{/* @ts-expect-error incorrect types on trpc.withTRPC */}
					<ClientProviders>{props.children}</ClientProviders>
				</ServerProviders>
			</body>
		</html>
	);
}
