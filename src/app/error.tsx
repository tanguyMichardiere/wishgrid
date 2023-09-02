"use client";

import { useLogger } from "next-axiom";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset, ...props }: Props): JSX.Element {
  const log = useLogger();

  useEffect(
    function () {
      log.error("client error", { error: props.error });
    },
    [props.error, log],
  );

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h2 className="text-center">An unexpected error has occurred, it has been reported</h2>
      {props.error.digest !== undefined && <p>Digest: {props.error.digest}</p>}
      <button className="btn" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
