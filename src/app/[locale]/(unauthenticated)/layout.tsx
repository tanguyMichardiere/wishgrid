import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function UnauthenticatedLayout(props: Props): JSX.Element {
  return (
    <div className="mx-auto flex max-w-sm justify-center pb-20 pt-[clamp(2rem,10vw,5rem)]">
      {props.children}
    </div>
  );
}
