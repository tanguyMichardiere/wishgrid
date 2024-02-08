import type { JSX } from "react";
import { useServerTranslations } from "../utils/translations/server";

export default function About(): JSX.Element {
  const t = useServerTranslations("About");

  return (
    <div className="prose px-4">
      <h1>{t("title")}</h1>
      <p className="lead">{t("subtitle")}</p>
    </div>
  );
}
