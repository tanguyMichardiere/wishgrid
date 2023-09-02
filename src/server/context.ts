import type { User } from "@clerk/backend";
import { currentUser } from "@clerk/nextjs";
import "server-only";

export type Context = {
  user: User | null;
};

export async function createContext(/* opts: FetchCreateContextFnOptions */): Promise<Context> {
  return {
    user: await currentUser(),
  };
}
