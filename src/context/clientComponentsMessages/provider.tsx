"use client";

import type { ReactNode } from "react";
import { clientComponentsMessagesContext } from "./context";

type Props = {
  children: ReactNode;
  messages: Messages["ClientComponents"];
};

export default function ClientComponentsMessagesProvider(props: Props): JSX.Element {
  return (
    <clientComponentsMessagesContext.Provider value={props.messages}>
      {props.children}
    </clientComponentsMessagesContext.Provider>
  );
}
