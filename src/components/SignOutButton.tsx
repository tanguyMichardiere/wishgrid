"use client";

import { useClerk } from "@clerk/nextjs";
import { useLogger } from "next-axiom";
import { useCallback } from "react";

export default function SignOutButton(): JSX.Element {
  const clerk = useClerk();
  const log = useLogger();

  const signOut = useCallback(
    function () {
      clerk.signOut().catch(function (error) {
        log.error("error", { error: error });
      });
    },
    [clerk, log],
  );

  return (
    <button className="btn" onClick={signOut} type="button">
      Sign out
    </button>
  );
}
