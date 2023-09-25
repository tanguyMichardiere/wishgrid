"use client";

import { UserProfile as ClerkUserProfile } from "@clerk/nextjs";
import { useClerkTheme } from "../../../../../hooks/clerkTheme";

type Props = {
  path: string;
};

export default function UserProfile(props: Props): JSX.Element {
  const theme = useClerkTheme();

  return <ClerkUserProfile appearance={{ baseTheme: theme }} path={props.path} routing="path" />;
}
