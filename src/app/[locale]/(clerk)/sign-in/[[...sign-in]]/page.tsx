import { useLocale } from "next-intl";
import SignIn from "./SignIn";

export default function SignInPage(): JSX.Element {
  const locale = useLocale();

  return (
    <SignIn
      path={`/${locale !== "en" ? `${locale}/` : ""}sign-in`}
      redirectUrl={`/${locale !== "en" ? `${locale}` : ""}`}
      signUpUrl={`/${locale !== "en" ? `${locale}/` : ""}sign-up`}
    />
  );
}
