import { useServerTranslations } from "../../utils/translations/server";
import SearchUserButtonClient from "./client";

export default function SearchUserButton(): JSX.Element {
  const t = useServerTranslations("SearchUserButton");

  return <SearchUserButtonClient text={t("text")} />;
}
