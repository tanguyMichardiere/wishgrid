import type { ReactNode } from "react";
import Navbar from "./Navbar";

export const runtime = "edge";

type Props = {
  children: ReactNode;
};

export default function SignedInLayout(props: Props): JSX.Element {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Navbar />
      <div className="mx-auto max-w-sm pb-20">{props.children}</div>
    </>
  );
}
