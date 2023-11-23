import About from "../../../../../components/About";
import EmailSignIn from "../../../../../components/EmailSignIn";
import SignInButton from "../../../../../components/SignInButton";
import { useServerTranslations } from "../../../../../utils/translations/server";

type Props = {
  searchParams: { error?: string };
};

export default function SignInPage(props: Props): JSX.Element {
  const t = useServerTranslations("SignInPage");

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
        <SignInButton provider="discord" />
        <div className="divider">{t("or")}</div>
        <EmailSignIn />
      </div>
    </div>
  );
}
