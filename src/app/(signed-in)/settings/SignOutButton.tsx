"use client";

import { useClerk } from "@clerk/nextjs";
import { useCallback } from "react";

export default function SignOutButton(): JSX.Element {
  const clerk = useClerk();

  const signOut = useCallback(
    async function () {
      await clerk.signOut();
    },
    [clerk]
  );

  return (
    <button className="btn" onClick={signOut} type="button">
      Sign out
    </button>
  );
}
