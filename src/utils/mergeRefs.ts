import type { ForwardedRef, RefCallback } from "react";

export function mergeRefs<T>(...refs: Array<ForwardedRef<T>>): RefCallback<T> {
  return function (value) {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref !== null) {
        ref.current = value;
      }
    }
  };
}
