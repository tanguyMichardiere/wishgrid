import type { User } from "@clerk/backend";
import { currentUser } from "@clerk/nextjs";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { Logger } from "next-axiom";
import "server-only";

export type Context = {
  start: number;
  contextCreated: number;
  log: Logger;
  user: User | null;
};

export async function createContext(_opts?: FetchCreateContextFnOptions): Promise<Context> {
  const start = Date.now();
  const log = new Logger();
  const user = await currentUser();
  const contextCreated = Date.now();

  return {
    start,
    contextCreated,
    log,
    user,
  };
}
