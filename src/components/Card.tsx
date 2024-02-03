import cx from "classix";
import type { JSX, ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function Card(props: Props): JSX.Element {
  return (
    <div className="@container">
      <div
        className={cx(
          "border-base-900 flex max-w-sm grow flex-row items-center gap-4 bg-base-100 px-4 py-2 transition-colors hover:bg-base-200 @sm:mx-2 @sm:mb-2 @sm:rounded-xl @sm:shadow-xl",
          props.className,
        )}
      >
        {props.children}
      </div>
    </div>
  );
}
