import Link from "next/link";
import type { ReactNode } from "react";

export const runtime = "edge";

type Props = {
  children: ReactNode;
};

export default function ClerkLayout(props: Props): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-10 justify-center pt-[clamp(2rem,10vw,5rem)]">
      {props.children}
      <Link className="link mb-10" href="/settings">
        Return to settings
      </Link>
    </div>
  );
}
