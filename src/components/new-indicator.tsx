export function NewIndicator() {
	return (
		<div className="inline-grid *:[grid-area:1/1]">
			<div className="status status-primary animate-ping" />
			<div className="status status-primary" />
		</div>
	);
}
