import { createContext } from "react";
import type { User } from "../../server/db/types/user";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const currentUserContext = createContext<User>(null!);
