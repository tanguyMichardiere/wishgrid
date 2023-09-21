import { useServerTranslations } from "../../utils/translations/server";
import SignOutButtonClient from "./client";

export default function SignOutButton(): JSX.Element {
  const t = useServerTranslations("SignOutButton");

  return <SignOutButtonClient text={t("text")} />;
}
