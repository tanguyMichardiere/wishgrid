import { useTranslations } from "next-intl";
import "server-only";
import SignOutButtonClient from "./client";

export default function SignOutButton(): JSX.Element {
  const t = useTranslations("SignOutButton");

  return <SignOutButtonClient text={t("text")} />;
}
