import About from "../../../../../components/About";
import EmailSignIn from "../../../../../components/EmailSignIn";
import SignInButton from "../../../../../components/SignInButton";
import { useServerTranslations } from "../../../../../utils/translations/server";

export default function SignInPage(): JSX.Element {
  const t = useServerTranslations("SignInPage");

  return (
    <div className="flex flex-col items-center gap-8">
      <About />
      <div className="flex flex-col items-center gap-2">
        <SignInButton provider="discord" />
        <div className="divider">{t("or")}</div>
        <EmailSignIn />
      </div>
    </div>
  );
}
