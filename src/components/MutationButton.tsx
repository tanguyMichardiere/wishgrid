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
  function mutate() {
    props.mutation.mutate(props.variables);
  }

  return (
    <button
      className={cx("btn", props.className)}
      disabled={props.mutation.isPending || props.disabled === true}
      onClick={mutate}
      type={type}
    >
      {props.mutation.isPending && <span className="loading loading-spinner" />}
      {props.children}
    </button>
  );
}
