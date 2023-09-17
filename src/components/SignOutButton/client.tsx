"use client";

import { useClerk } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { useLogger } from "next-axiom";
import type { ClientProps } from "./props";

export default function SignOutButtonClient(props: ClientProps): JSX.Element {
  const clerk = useClerk();
  const log = useLogger();

  const queryClient = useQueryClient();

  function signOut() {
    clerk.signOut().catch(log.error);
    queryClient.removeQueries();
  }

  return (
    <button className="btn" onClick={signOut} type="button">
      {props.text}
    </button>
  );
}
