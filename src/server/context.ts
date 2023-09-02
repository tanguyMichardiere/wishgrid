import type { User } from "@clerk/backend";
import { currentUser } from "@clerk/nextjs";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { Logger } from "next-axiom";
import "server-only";
import { NODE_ENV } from "../env";

export type Context = {
  start: number;
  contextCreated: number;
  log: Logger;
  user: User | null;
};

export async function createContext(opts?: FetchCreateContextFnOptions): Promise<Context> {
  const start = Date.now();
  const log = new Logger(
    NODE_ENV === "development" ? { args: { url: opts?.req.url } } : { req: opts?.req },
  );
  const user = await currentUser();
  const contextCreated = Date.now();

  return {
    start,
    contextCreated,
    log,
    user,
  };
}
