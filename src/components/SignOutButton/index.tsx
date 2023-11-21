import { signOut } from "../../auth";
import { useServerTranslations } from "../../utils/translations/server";
import SignOutButtonClient from "./client";

export default function SignOutButton(): JSX.Element {
  const t = useServerTranslations("SignOutButton");

  async function signOutAction() {
    "use server";
    await signOut();
  }

  return <SignOutButtonClient signOutAction={signOutAction} text={t("text")} />;
}
