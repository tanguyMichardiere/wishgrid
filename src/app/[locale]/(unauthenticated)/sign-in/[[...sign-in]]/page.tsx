import { getLocale, getTranslations } from "next-intl/server";
import type { JSX } from "react";
import { About } from "../../../../../components/about";
import { EmailSignIn } from "../../../../../components/email-signin";
import { SignInButton } from "../../../../../components/sign-in-button";
import { routing } from "../../../../../i18n/routing";

type SearchParams = {
	redirectTo?: string;
	error?: string;
};

type Props = {
	searchParams: Promise<SearchParams>;
};

export default async function SignInPage(props: Props): Promise<JSX.Element> {
	const locale = await getLocale();
	const t = await getTranslations("SignInPage");

	const searchParams = await props.searchParams;

	const redirectTo =
		searchParams.redirectTo !== undefined
			? decodeURIComponent(searchParams.redirectTo)
			: `/${locale !== routing.defaultLocale ? locale : ""}`;

	return (
		<div className="flex flex-col items-center gap-8">
			<About />
			{searchParams.error !== undefined && (
				<div className="alert alert-error flex flex-col gap-2 text-center">
					{searchParams.error === "OAuthAccountNotLinked" ? (
						<>
							<h3 className="text-lg">{t("error.OAuthAccountNotLinked.title")}</h3>
							<p>{t("error.OAuthAccountNotLinked.body")}</p>
						</>
					) : (
						<div className="text-lg">{t("error.defaultTitle")}</div>
					)}
				</div>
			)}
			<div className="flex flex-col items-center gap-2">
				<SignInButton provider="discord" redirectTo={redirectTo} />
				<div className="divider">{t("or")}</div>
				<EmailSignIn redirectTo={redirectTo} />
			</div>
		</div>
	);
}
