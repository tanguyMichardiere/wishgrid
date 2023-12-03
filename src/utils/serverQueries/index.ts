import { TRPCError } from "@trpc/server";
import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
import { cache } from "react";
import "server-only";
import { redirect } from "../../navigation";
import { createServerSideHelpers } from "../trpc/server";

export const serverQuery = <P extends Array<unknown>, R>(
  fn: (trpc: Awaited<ReturnType<typeof createServerSideHelpers>>, ...args: P) => Promise<R>,
  errors: Partial<Record<TRPC_ERROR_CODE_KEY, (error: TRPCError) => R>> = {},
): ((...args: P) => Promise<R>) =>
  cache(async function (...args: P) {
    const trpc = await createServerSideHelpers();
    try {
      return await fn(trpc, ...args);
    } catch (error) {
      if (error instanceof TRPCError) {
        if (error.code === "UNAUTHORIZED") {
          redirect("/sign-in");
        }
        const handler = errors[error.code];
        if (handler !== undefined) {
          return handler(error);
        }
      }
      throw error;
    }
  });
