"use client";

import { SignIn } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { useClerkTheme } from "../../../../../hooks/useClerkTheme";

export default function SignInPage(): JSX.Element {
  const locale = useLocale();

  const theme = useClerkTheme();

  return (
    <SignIn
      appearance={{ baseTheme: theme }}
      path={`/${locale !== "en" ? `${locale}/` : ""}sign-in`}
      redirectUrl={`/${locale !== "en" ? `${locale}` : ""}`}
      routing="path"
      signUpUrl={`/${locale !== "en" ? `${locale}/` : ""}sign-up`}
    />
  );
}
