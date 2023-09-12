import type React from "react";

declare module "react" {
  // simplification of forwardRef to fix generic props
  function forwardRef<T, P = object>(
    render: (props: P, ref: React.ForwardedRef<T>) => React.ReactNode,
  ): (props: React.PropsWithoutRef<P> & React.RefAttributes<T>) => React.ReactNode;
}
