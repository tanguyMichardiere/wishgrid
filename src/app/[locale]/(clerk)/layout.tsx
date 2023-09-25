import type { ReactNode } from "react";

export const runtime = "edge";

type Props = {
  children: ReactNode;
};

export default function ClerkLayout(props: Props): JSX.Element {
  return (
    <div className="flex justify-center pt-[clamp(2rem,10vw,5rem)]">
      <div className="mb-20">{props.children}</div>
    </div>
  );
}
