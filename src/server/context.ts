import { PrismaClient } from "@prisma/client";
import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth";
import { log } from "next-axiom";
import { nextAuthOptions } from "../pages/api/auth/[...nextauth]";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function createContext({ req, res }: CreateNextContextOptions) {
  return {
    logger: log.with(req.query),
    prisma: new PrismaClient(),
    session: await getServerSession(req, res, nextAuthOptions),
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
