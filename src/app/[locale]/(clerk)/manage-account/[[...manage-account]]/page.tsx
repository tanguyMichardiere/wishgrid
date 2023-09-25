import { useLocale } from "next-intl";
import Link from "next-intl/link";
import DeleteCurrentUserButton from "../../../../../components/DeleteCurrentUserButton";
import { useServerTranslations } from "../../../../../utils/translations/server";
import UserProfile from "./UserProfile";

export const runtime = "edge";

export default function ManageAccountPage(): JSX.Element {
  const locale = useLocale();
  const t = useServerTranslations("ManageAccountPage");

  return (
    <div className="flex flex-col items-center gap-10">
      <Link className="link" href="/settings">
        {t("returnToSettings")}
      </Link>
      <UserProfile path={`/${locale !== "en" ? `${locale}/` : ""}manage-account`} />
      <DeleteCurrentUserButton />
      <Link className="link" href="/settings">
        {t("returnToSettings")}
      </Link>
    </div>
  );
}
