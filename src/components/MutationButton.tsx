"use client";

import type { UseTRPCMutationResult } from "@trpc/react-query/shared";
import cx from "classix";
import type { ReactNode } from "react";

export type Props<TVariables> = {
  className?: string;
  type?: "reset" | "button" | "submit";
  mutation: UseTRPCMutationResult<void, unknown, TVariables, unknown>;
  variables: TVariables;
  children: ReactNode;
};

export default function MutationButton<TVariables>({
  type = "button",
  ...props
}: Props<TVariables>): JSX.Element {
  return (
    <button
      className={cx("btn", props.mutation.isLoading && "btn-disabled loading", props.className)}
      disabled={props.mutation.isLoading}
      onClick={function () {
        props.mutation.mutate(props.variables);
      }}
      type={type}
    >
      {props.children}
    </button>
  );
}
