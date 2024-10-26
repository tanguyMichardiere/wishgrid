import type { JSX } from "react";
import { Link } from "../../../../../i18n/routing";
import { useServerTranslations } from "../../../../../utils/translations/server";

type SearchParams = {
	error?: string;
};

type Props = {
	searchParams: Promise<SearchParams>;
};

export default async function AuthErrorPage(props: Props): Promise<JSX.Element> {
	const t = useServerTranslations("AuthErrorPage");

	const searchParams = await props.searchParams;

	return (
		<div className="flex flex-col items-center gap-2">
			{searchParams.error === "Verification" ? (
				<>
					<h1 className="text-xl">{t("Verification.title")}</h1>
					<p className="text-center">{t("Verification.body")}</p>
				</>
			) : (
				<h1>{t("defaultTitle")}</h1>
			)}
			<Link className="link" href="/sign-in">
				{t("signInLinkText")}
			</Link>
		</div>
	);
}
