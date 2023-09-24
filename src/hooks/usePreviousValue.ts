import "client-only";
import { useEffect, useState } from "react";

export function usePreviousValue<T>(value: T): T | undefined {
  const [previousValue, setPreviousValue] = useState<T>();

  useEffect(
    function () {
      setPreviousValue(value);
    },
    [value],
  );

  return previousValue;
}
