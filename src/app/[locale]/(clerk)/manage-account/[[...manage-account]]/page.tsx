"use client";

import { UserProfile } from "@clerk/nextjs";
import Link from "next-intl/link";
import { useClerkTheme } from "../../../../../hooks/useClerkTheme";

export default function UserProfilePage(): JSX.Element {
  const theme = useClerkTheme();

  return (
    <div className="flex flex-col items-center gap-10">
      <UserProfile appearance={{ baseTheme: theme }} path="/manage-account" routing="path" />
      <Link className="link" href="/settings">
        Return to settings
      </Link>
    </div>
  );
}
