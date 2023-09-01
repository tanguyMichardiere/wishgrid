import type React from "react";

// simplification of forwardRef to fix generic props
declare module "react" {
  function forwardRef<T, P = Record<string, never>>(
    render: (props: P, ref: React.ForwardedRef<T>) => React.ReactNode,
  ): (props: React.PropsWithoutRef<P> & React.RefAttributes<T>) => React.ReactNode;
}
