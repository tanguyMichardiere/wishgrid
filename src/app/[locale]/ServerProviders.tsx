import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ServerProviders(props: Props): JSX.Element {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          // fix for white on white text in form input fields in dark mode
          formFieldInput: "dark:bg-[rgba(70,90,126,0.4)]",
        },
      }}
    >
      {props.children}
    </ClerkProvider>
  );
}
