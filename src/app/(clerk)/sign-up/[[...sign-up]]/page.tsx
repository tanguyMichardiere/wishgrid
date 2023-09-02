"use client";

import { SignUp } from "@clerk/nextjs";
import { useClerkTheme } from "../../../../hooks/useClerkTheme";

export default function SignUpPage(): JSX.Element {
  const theme = useClerkTheme();

  return <SignUp appearance={{ baseTheme: theme }} />;
}
