import { useTranslations } from "next-intl";
import "server-only";
import NewWishButtonClient from "./client";

export default function NewWishButton(): JSX.Element {
  const t = useTranslations("NewWishButton");

  return <NewWishButtonClient text={t("text")} />;
}
