import type { JSX } from "react";

export function DefaultLoadingPage(): JSX.Element {
	return (
		<div className="flex flex-col items-center pt-48">
			<span className="loading loading-spinner loading-lg" />
		</div>
	);
}
