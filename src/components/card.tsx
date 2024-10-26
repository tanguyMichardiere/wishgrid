import cx from "classix";
import type { JSX, ReactNode } from "react";

type Props = {
	className?: string;
	children: ReactNode;
};

export function Card(props: Props): JSX.Element {
	return (
		<div className="@container">
			<div
				className={cx(
					"@sm:mx-2 @sm:mb-2 flex max-w-sm grow flex-row items-center gap-4 @sm:rounded-xl border-base-900 bg-base-100 px-4 py-2 @sm:shadow-xl transition-colors hover:bg-base-200",
					props.className,
				)}
			>
				{props.children}
			</div>
		</div>
	);
}
