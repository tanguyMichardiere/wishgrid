"use client";

import { SignUp } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { useClerkTheme } from "../../../../../hooks/clerkTheme";

export default function SignUpPage(): JSX.Element {
  const theme = useClerkTheme();
  const locale = useLocale();

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
