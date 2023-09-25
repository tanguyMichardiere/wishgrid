import { useLocale } from "next-intl";
import SignUp from "./SignUp";

export const runtime = "edge";

export default function SignUpPage(): JSX.Element {
  const locale = useLocale();

  return (
    <SignUp
      path={`/${locale !== "en" ? `${locale}/` : ""}sign-up`}
      redirectUrl={`/${locale !== "en" ? `${locale}` : ""}`}
      signInUrl={`/${locale !== "en" ? `${locale}/` : ""}sign-in`}
    />
  );
}
