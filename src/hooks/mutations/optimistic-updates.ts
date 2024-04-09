import "client-only";
import { useEffect, useState } from "react";

export function useOptimisticUpdates(): boolean {
	const [connectionType, setConnectionType] = useState<string>();

	useEffect(() => {
		const timeout = setInterval(() => {
			if (
				"connection" in navigator &&
				typeof navigator.connection === "object" &&
				navigator.connection !== null &&
				"effectiveType" in navigator.connection &&
				typeof navigator.connection.effectiveType === "string"
			) {
				setConnectionType(navigator.connection.effectiveType);
			}
		}, 1000);
		return () => {
			clearInterval(timeout);
		};
	}, []);

	return connectionType === "4g";
}
