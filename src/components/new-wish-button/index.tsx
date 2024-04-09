import type { JSX } from "react";
import { useServerTranslations } from "../../utils/translations/server";
import { NewWishButtonClient } from "./client";

export function NewWishButton(): JSX.Element {
	const t = useServerTranslations("NewWishButton");

	return <NewWishButtonClient text={t("text")} />;
}
