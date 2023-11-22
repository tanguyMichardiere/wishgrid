import "client-only";
import { useContext } from "react";
import type { User } from "../../server/database/types/user";
import { currentUserContext } from "./context";

export function useCurrentUser(): User {
  return useContext(currentUserContext);
}
