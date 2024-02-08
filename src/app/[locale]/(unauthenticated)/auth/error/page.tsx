import type { JSX } from "react";
import { Link } from "../../../../../navigation";
import { useServerTranslations } from "../../../../../utils/translations/server";

type Props = {
  searchParams: { error?: string };
};

export default function AuthErrorPage(props: Props): JSX.Element {
  const t = useServerTranslations("AuthErrorPage");

  return (
    <div className="flex flex-col items-center gap-2">
      {props.searchParams.error === "Verification" ? (
        <>
          <h1 className="text-xl">{t("Verification.title")}</h1>
          <p className="text-center">{t("Verification.body")}</p>
        </>
      ) : (
        <h1>{t("defaultTitle")}</h1>
      )}
      <Link className="link" href="/sign-in">
        {t("signInLinkText")}
      </Link>
    </div>
  );
}
