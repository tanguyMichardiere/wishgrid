import type { JSX } from "react";
import { useServerTranslations } from "../../../../../utils/translations/server";

export default function AuthVerifyRequestPage(): JSX.Element {
  const t = useServerTranslations("AuthVerifyRequestPage");

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-xl">{t("title")}</h1>
      <p>{t("body")}</p>
    </div>
  );
}
