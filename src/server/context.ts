import "server-only";

// eslint-disable-next-line @typescript-eslint/ban-types
export type Context = {};

export async function createContext(/* opts: FetchCreateContextFnOptions */): Promise<Context> {
  return Promise.resolve({});
}
