import type { UseTRPCMutationResult } from "@trpc/react-query/shared";
import cx from "classix";
import "client-only";
import type { ReactNode } from "react";

export type Props<TVariables> = {
  className?: string;
  type?: "reset" | "button" | "submit";
  disabled?: boolean;
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
      className={cx("btn", props.className)}
      disabled={props.mutation.isLoading || props.disabled === true}
      onClick={function () {
        props.mutation.mutate(props.variables);
      }}
      type={type}
    >
      {props.mutation.isLoading && <span className="loading loading-spinner" />}
      {props.children}
    </button>
  );
}
