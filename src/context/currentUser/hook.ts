import { useContext } from "react";
import type { User } from "../../server/db/types/user";
import { currentUserContext } from "./context";

export function useCurrentUser(): User {
  return useContext(currentUserContext);
}
