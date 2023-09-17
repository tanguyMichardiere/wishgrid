"use client";

import { SignUp } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { useClerkTheme } from "../../../../../hooks/useClerkTheme";

export default function SignUpPage(): JSX.Element {
  const locale = useLocale();

  const theme = useClerkTheme();

  return (
    <SignUp
      appearance={{ baseTheme: theme }}
      path={`/${locale !== "en" ? `${locale}/` : ""}sign-up`}
      redirectUrl={`/${locale !== "en" ? `${locale}` : ""}`}
      routing="path"
      signInUrl={`/${locale !== "en" ? `${locale}/` : ""}sign-in`}
    />
  );
}
