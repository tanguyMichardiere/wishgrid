import type { ReactNode } from "react";
import Navbar from "../../components/Navbar";

export const runtime = "edge";

type Props = {
  children: ReactNode;
};

export default function SignedInLayout(props: Props): JSX.Element {
  return (
    <>
      <Navbar />
      <div className="mx-auto flex min-h-[calc(100%-72px)] max-w-sm flex-col pb-20">
        {props.children}
      </div>
    </>
  );
}
