import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ServerProviders(props: Props): JSX.Element {
  return <ClerkProvider>{props.children}</ClerkProvider>;
}
