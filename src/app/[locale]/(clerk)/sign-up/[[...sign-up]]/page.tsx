import { useLocale } from "next-intl";
import About from "../../../../../components/About";
import SignUp from "./SignUp";

export default function SignUpPage(): JSX.Element {
  const locale = useLocale();

  return (
    <div className="flex flex-col items-center gap-8">
      <SignUp
        path={`/${locale !== "en" ? `${locale}/` : ""}sign-up`}
        redirectUrl={`/${locale !== "en" ? `${locale}` : ""}`}
        signInUrl={`/${locale !== "en" ? `${locale}/` : ""}sign-in`}
      />
      <About />
    </div>
  );
}
