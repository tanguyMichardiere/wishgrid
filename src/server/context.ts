import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import "server-only";

export type Context = object;

export function createContext(_opts?: FetchCreateContextFnOptions): Promise<Context> {
	return Promise.resolve({});
}
