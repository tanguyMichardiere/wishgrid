"use client";

import { SignUp as ClerkSignUp } from "@clerk/nextjs";
import { useClerkTheme } from "../../../../../hooks/clerkTheme";

type Props = {
  path: string;
  redirectUrl: string;
  signInUrl: string;
};

export default function SignUp(props: Props): JSX.Element {
  const theme = useClerkTheme();

  return (
    <ClerkSignUp
      appearance={{ baseTheme: theme }}
      path={props.path}
      redirectUrl={props.redirectUrl}
      routing="path"
      signInUrl={props.signInUrl}
    />
  );
}
