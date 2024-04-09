import "client-only";
import { createContext } from "react";
import type { User } from "../../server/database/types/user";

// biome-ignore lint/style/noNonNullAssertion: we assume that the context hook will only be called inside the provider
export const currentUserContext = createContext<User>(null!);
