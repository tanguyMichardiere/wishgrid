import { useLocale } from "next-intl";
import About from "../../../../../components/About";
import EmailSignIn from "../../../../../components/EmailSignIn";
import SignInButton from "../../../../../components/SignInButton";
import { useServerTranslations } from "../../../../../utils/translations/server";

type Props = {
  searchParams: {
    redirectTo?: string;
    error?: string;
  };
};

export default function SignInPage(props: Props): JSX.Element {
  const locale = useLocale();
  const t = useServerTranslations("SignInPage");

  const redirectTo =
    props.searchParams.redirectTo !== undefined
      ? decodeURIComponent(props.searchParams.redirectTo)
      : `/${locale !== "en" ? locale : ""}`;

  return (
    <div className="flex flex-col items-center gap-8">
      <About />
      {props.searchParams.error !== undefined && (
        <div className="alert alert-error flex flex-col gap-2 text-center">
          {props.searchParams.error === "OAuthAccountNotLinked" ? (
            <>
              <h3 className="text-lg">{t("error.OAuthAccountNotLinked.title")}</h3>
              <p>{t("error.OAuthAccountNotLinked.body")}</p>
            </>
          ) : (
            <div className="text-lg">{t("error.defaultTitle")}</div>
          )}
        </div>
      )}
      <div className="flex flex-col items-center gap-2">
        <SignInButton provider="discord" redirectTo={redirectTo} />
        <div className="divider">{t("or")}</div>
        <EmailSignIn redirectTo={redirectTo} />
      </div>
    </div>
  );
}
