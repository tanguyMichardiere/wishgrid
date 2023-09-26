import { useServerTranslations } from "../../../../utils/translations/server";
import Search from "./Search";

export default function SearchPage(): JSX.Element {
  const t = useServerTranslations("SearchPage");

  return (
    <div className="flex flex-col gap-4">
      <Search inputPlaceholder={t("inputPlaceholder")} noResults={t("noResults")} />
    </div>
  );
}
