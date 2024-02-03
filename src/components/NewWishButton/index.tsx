import type { JSX } from "react";
import { useServerTranslations } from "../../utils/translations/server";
import NewWishButtonClient from "./client";

export default function NewWishButton(): JSX.Element {
  const t = useServerTranslations("NewWishButton");

  return <NewWishButtonClient text={t("text")} />;
}
