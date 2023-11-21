"use client";

import { useQueryClient } from "@tanstack/react-query";

type Props = {
  text: string;
  signOutAction: () => Promise<void>;
};

export default function SignOutButtonClient(props: Props): JSX.Element {
  const queryClient = useQueryClient();

  function signOut() {
    void props.signOutAction();
    queryClient.removeQueries();
  }

  return (
    <button className="btn" onClick={signOut} type="button">
      {props.text}
    </button>
  );
}
