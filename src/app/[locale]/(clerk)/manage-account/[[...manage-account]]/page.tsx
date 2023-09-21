"use client";

import { UserProfile } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import Link from "next-intl/link";
import { useClerkTheme } from "../../../../../hooks/useClerkTheme";
import { useClientTranslations } from "../../../../../utils/translations/client";

export default function UserProfilePage(): JSX.Element {
  const t = useClientTranslations("clientComponents.UserProfilePage");

  const locale = useLocale();

  const theme = useClerkTheme();

  return (
    <div className="flex flex-col items-center gap-10">
      <UserProfile
        appearance={{ baseTheme: theme }}
        path={`/${locale !== "en" ? `${locale}/` : ""}manage-account`}
        routing="path"
      />
      <Link className="link" href="/settings">
        {t("returnToSettings")}
      </Link>
    </div>
  );
}
