import type { ForwardedRef, RefCallback } from "react";

/**
 * Set a ref inside a `forwardRef` component
 *
 * @example
 *
 * ```ts
 * export default forwardRef<{ close: () => void }, Props>(function Modal(props, ref) {
 *   function close() {
 *     // ...
 *   }
 *
 *   setRef(ref, { close });
 *
 *   // ...
 * });
 * ```
 */
export function setRef<T>(ref: ForwardedRef<T>, value: T): void {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null) {
    ref.current = value;
  }
}

/**
 * Merge refs to give to a component
 *
 * @example
 *
 * ```ts
 * export default forwardRef<HTMLDialogElement, Props>(function SpecializedModal(props, ref) {
 *   const innerRef = useRef<HTMLDialogElement>(null)
 *
 *   function close() {
 *     innerRef.current?.close();
 *   }
 *
 *   return <Modal ref={mergeRefs(ref, innerRef)} />
 * });
 * ```
 */
export function mergeRefs<T>(...refs: Array<ForwardedRef<T>>): RefCallback<T> {
  return function (value) {
    for (const ref of refs) {
      setRef(ref, value);
    }
  };
}
