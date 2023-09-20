import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import DeleteCurrentUserButton from "../../../../components/DeleteCurrentUserButton";
import SignOutButton from "../../../../components/SignOutButton";
import ThemeMenu from "../../../../components/ThemeMenu";

export const runtime = "edge";

export default function SettingsPage(): JSX.Element {
  const t = useTranslations("SettingsPage");

  return (
    <div className="mx-4 flex grow flex-col justify-between gap-16">
      <div className="flex flex-col items-center gap-8">
        <div className="flex w-full items-center justify-between">
          <p>{t("theme")}</p>
          <ThemeMenu position="left" />
        </div>
        <Link className="link" href="/manage-account">
          {t("manageAccount")}
        </Link>
        <SignOutButton />
      </div>
      <div className="flex justify-center">
        <DeleteCurrentUserButton />
      </div>
    </div>
  );
}
