import { createServerSideHelpers as _createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSidePropsContext } from "next";
import type { Session } from "next-auth";
import { getServerSession as _getServerSession } from "next-auth";
import { log } from "next-axiom";
import SuperJSON from "superjson";
import { nextAuthOptions } from "../pages/api/auth/[...nextauth]";
import { prisma } from "../server/prisma";
import type { Router } from "../server/router";
import { router } from "../server/router";

export async function getServerSession({
  req,
  res,
}: GetServerSidePropsContext): Promise<Session | null> {
  return _getServerSession(req, res, nextAuthOptions);
}

export function createServerSideHelpers(
  { req, params }: GetServerSidePropsContext,
  session: Session | null
): ReturnType<typeof _createServerSideHelpers<Router>> {
  return _createServerSideHelpers({
    router,
    ctx: {
      log: log.with({ ssr: { url: req.url, params } }),
      prisma,
      session,
    },
    transformer: SuperJSON,
  });
}
