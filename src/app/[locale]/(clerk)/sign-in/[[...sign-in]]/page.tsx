import { useLocale } from "next-intl";
import About from "../../../../../components/About";
import SignIn from "./SignIn";

export default function SignInPage(): JSX.Element {
  const locale = useLocale();

  return (
    <div className="flex flex-col items-center gap-8">
      <SignIn
        path={`/${locale !== "en" ? `${locale}/` : ""}sign-in`}
        redirectUrl={`/${locale !== "en" ? `${locale}` : ""}`}
        signUpUrl={`/${locale !== "en" ? `${locale}/` : ""}sign-up`}
      />
      <About />
    </div>
  );
}
