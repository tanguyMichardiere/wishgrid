"use client";

import { cx } from "classix";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { usePrevious } from "../hooks/usePrevious";

export type Props = {
  className?: string;
  children: ReactNode;
} & ({ afterAction: "router.refresh" } | { afterAction?: () => void });

export default function InnerActionButton({ afterAction, ...props }: Props): JSX.Element {
  const { pending } = useFormStatus();
  const previousPending = usePrevious(pending);

  const router = useRouter();

  useEffect(
    function () {
      if (!pending && previousPending === true) {
        switch (afterAction) {
          case "router.refresh":
            router.refresh();
            break;
          default: {
            afterAction?.();
          }
        }
      }
    },
    [pending, previousPending, afterAction, router]
  );

  return (
    <button
      className={cx("btn", pending && "btn-disabled loading", props.className)}
      disabled={pending}
      type="submit"
    >
      {props.children}
    </button>
  );
}
