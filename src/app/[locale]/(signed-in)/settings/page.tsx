import Link from "next-intl/link";
import LanguageMenu from "../../../../components/LanguageMenu";
import SignOutButton from "../../../../components/SignOutButton";
import ThemeMenu from "../../../../components/ThemeMenu";
import { useServerTranslations } from "../../../../utils/translations/server";

export const runtime = "edge";

export default function SettingsPage(): JSX.Element {
  const t = useServerTranslations("SettingsPage");

  return (
    <div className="mx-4 flex flex-col items-center gap-8">
      <div className="flex w-full items-center justify-between">
        <p>{t("theme")}</p>
        <ThemeMenu position="left" />
      </div>
      <div className="flex w-full items-center justify-between">
        <p>{t("language")}</p>
        <LanguageMenu position="left" />
      </div>
      <Link className="link" href="/manage-account">
        {t("manageAccount")}
      </Link>
      <SignOutButton />
    </div>
  );
}
