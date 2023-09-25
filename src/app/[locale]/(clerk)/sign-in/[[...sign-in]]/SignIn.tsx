"use client";

import { SignIn as ClerkSignIn } from "@clerk/nextjs";
import { useClerkTheme } from "../../../../../hooks/clerkTheme";

type Props = {
  path: string;
  redirectUrl: string;
  signUpUrl: string;
};

export default function SignIn(props: Props): JSX.Element {
  const theme = useClerkTheme();

  return (
    <ClerkSignIn
      appearance={{ baseTheme: theme }}
      path={props.path}
      redirectUrl={props.redirectUrl}
      routing="path"
      signUpUrl={props.signUpUrl}
    />
  );
}
