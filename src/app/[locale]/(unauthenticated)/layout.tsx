import type { JSX, ReactNode } from "react";

type Props = { children: ReactNode };

export default function UnauthenticatedLayout(props: Props): JSX.Element {
	return (
		<div className="mx-auto flex max-w-sm justify-center pt-[clamp(2rem,10vw,5rem)] pb-20">
			{props.children}
		</div>
	);
}
