"use client";

import { UserProfile } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import Link from "next-intl/link";
import DeleteCurrentUserButton from "../../../../../components/DeleteCurrentUserButton";
import { useClerkTheme } from "../../../../../hooks/clerkTheme";
import { useClientTranslations } from "../../../../../utils/translations/client";

export default function UserProfilePage(): JSX.Element {
  const theme = useClerkTheme();
  const t = useClientTranslations("clientComponents.UserProfilePage");
  const locale = useLocale();

  return (
    <div className="flex flex-col items-center gap-10">
      <Link className="link" href="/settings">
        {t("returnToSettings")}
      </Link>
      <UserProfile
        appearance={{ baseTheme: theme }}
        path={`/${locale !== "en" ? `${locale}/` : ""}manage-account`}
        routing="path"
      />
      <DeleteCurrentUserButton />
      <Link className="link" href="/settings">
        {t("returnToSettings")}
      </Link>
    </div>
  );
}
