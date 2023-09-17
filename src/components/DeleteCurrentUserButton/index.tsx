import { useTranslations } from "next-intl";
import "server-only";
import DeleteCurrentUserButtonClient from "./client";

export default function DeleteCurrentUserButton(): JSX.Element {
  const t = useTranslations("DeleteCurrentUserButton");

  return (
    <DeleteCurrentUserButtonClient
      modalBody={t("modalBody")}
      modalTitle={t("modalTitle")}
      text={t("text")}
    />
  );
}
