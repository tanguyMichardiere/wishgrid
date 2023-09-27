import "react";

declare module "react" {
  // simplification of forwardRef to fix generic props
  function forwardRef<T, P = object>(
    render: (props: P, ref: ForwardedRef<T>) => ReactNode,
  ): (props: PropsWithoutRef<P> & RefAttributes<T>) => ReactNode;
}
