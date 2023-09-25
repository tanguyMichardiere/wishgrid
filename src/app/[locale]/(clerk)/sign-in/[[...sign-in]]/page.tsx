"use client";

import { SignIn } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { useClerkTheme } from "../../../../../hooks/clerkTheme";

export default function SignInPage(): JSX.Element {
  const theme = useClerkTheme();
  const locale = useLocale();

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
