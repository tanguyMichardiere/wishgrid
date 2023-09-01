"use client";

import { UserProfile } from "@clerk/nextjs";
import { useClerkTheme } from "../../../../hooks/useClerkTheme";

export default function UserProfilePage(): JSX.Element {
  const theme = useClerkTheme();

  return <UserProfile appearance={{ baseTheme: theme }} path="/manage-account" routing="path" />;
}
