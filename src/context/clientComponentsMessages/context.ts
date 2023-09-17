import { createContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const clientComponentsMessagesContext = createContext<Messages["ClientComponents"]>(null!);
