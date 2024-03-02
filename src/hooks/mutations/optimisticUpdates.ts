import "client-only";
import { useEffect, useState } from "react";

export function useOptimisticUpdates(): boolean {
  const [connectionType, setConnectionType] = useState<string>();

  useEffect(function () {
    const timeout = setInterval(function () {
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
    return function () {
      clearInterval(timeout);
    };
  }, []);

  return connectionType === "4g";
}
