import type { UseTRPCMutationResult } from "@trpc/react-query/shared";
import cx from "classix";
import "client-only";
import type { JSX, ReactNode } from "react";

export type Props<Variables> = {
	className?: string;
	type?: "reset" | "button" | "submit";
	disabled?: boolean;
	mutation: UseTRPCMutationResult<void, unknown, Variables, unknown>;
	variables: Variables;
	children: ReactNode;
};

export function MutationButton<Variables>({
	type = "button",
	...props
}: Props<Variables>): JSX.Element {
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
