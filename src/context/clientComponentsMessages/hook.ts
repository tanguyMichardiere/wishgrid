import { useContext } from "react";
import { clientComponentsMessagesContext } from "./context";

export function useClientComponentsMessages(): Messages["ClientComponents"] {
  return useContext(clientComponentsMessagesContext);
}
