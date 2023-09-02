"use client";

import { useClerk } from "@clerk/nextjs";
import { log } from "next-axiom";
import { useCallback } from "react";

export default function SignOutButton(): JSX.Element {
  const clerk = useClerk();

  const signOut = useCallback(
    function () {
      clerk.signOut().catch(function (error) {
        log.error("error", { error: error });
      });
    },
    [clerk],
  );

  return (
    <button className="btn" onClick={signOut} type="button">
      Sign out
    </button>
  );
}
