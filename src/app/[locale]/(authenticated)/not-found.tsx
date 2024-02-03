import type { JSX } from "react";
import { Link } from "../../../navigation";
import { useServerTranslations } from "../../../utils/translations/server";

export default function NotFound(): JSX.Element {
  const t = useServerTranslations("NotFound");

  return (
    <div className="flex flex-col items-center gap-4 pt-48">
      <h2 className="text-center">{t("title")}</h2>
      <Link className="link" href="/">
        {t("returnHome")}
      </Link>
    </div>
  );
}
