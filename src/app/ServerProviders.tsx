import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ServerProviders(props: Props): JSX.Element {
  return <ClerkProvider appearance={{ baseTheme: undefined }}>{props.children}</ClerkProvider>;
}
