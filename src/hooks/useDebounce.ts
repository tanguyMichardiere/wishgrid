import "client-only";
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    function () {
      const timeout = setTimeout(function () {
        setDebouncedValue(value);
      }, delay);

      return function () {
        clearTimeout(timeout);
      };
    },
    [value, delay]
  );

  return debouncedValue;
}
