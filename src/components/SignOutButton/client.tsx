"use client";

import { useClerk } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  text: string;
};

export default function SignOutButtonClient(props: Props): JSX.Element {
  const clerk = useClerk();
  const queryClient = useQueryClient();

  function signOut() {
    void clerk.signOut();
    queryClient.removeQueries();
  }

  return (
    <button className="btn" onClick={signOut} type="button">
      {props.text}
    </button>
  );
}
