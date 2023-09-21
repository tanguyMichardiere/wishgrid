import { useServerTranslations } from "../../utils/translations/server";
import DeleteCurrentUserButtonClient from "./client";

export default function DeleteCurrentUserButton(): JSX.Element {
  const t = useServerTranslations("DeleteCurrentUserButton");

  return (
    <DeleteCurrentUserButtonClient
      modalBody={t("modalBody")}
      modalTitle={t("modalTitle")}
      text={t("text")}
    />
  );
}
