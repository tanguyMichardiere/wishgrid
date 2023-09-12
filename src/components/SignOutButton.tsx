"use client";

import { useClerk } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { useLogger } from "next-axiom";

export default function SignOutButton(): JSX.Element {
  const clerk = useClerk();
  const log = useLogger();

  const queryClient = useQueryClient();

  function signOut() {
    clerk.signOut().catch(log.error);
    queryClient.removeQueries();
  }

  return (
    <button className="btn" onClick={signOut} type="button">
      Sign out
    </button>
  );
}
