"use client";

import { SignIn } from "@clerk/nextjs";
import { useClerkTheme } from "../../../../../hooks/useClerkTheme";

export default function SignInPage(): JSX.Element {
  const theme = useClerkTheme();

  return <SignIn appearance={{ baseTheme: theme }} />;
}
