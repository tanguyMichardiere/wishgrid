import type { GetServerSidePropsContext } from "next";

import { PrismaClient } from "@prisma/client";
import { createProxySSGHelpers as _createProxySSGHelpers } from "@trpc/react-query/ssg";
import type { Session } from "next-auth";
import { getServerSession as _getServerSession } from "next-auth";
import { log } from "next-axiom";
import SuperJSON from "superjson";

import { nextAuthOptions } from "../pages/api/auth/[...nextauth]";
import type { Router } from "../server/router";
import { router } from "../server/router";

export async function getServerSession({
  req,
  res,
}: GetServerSidePropsContext): Promise<Session | null> {
  return _getServerSession(req, res, nextAuthOptions);
}

export function createProxySSGHelpers(
  { req, params }: GetServerSidePropsContext,
  session: Session | null
): ReturnType<typeof _createProxySSGHelpers<Router>> {
  return _createProxySSGHelpers({
    router,
    ctx: {
      logger: log.with({ ssr: { url: req.url, params } }),
      prisma: new PrismaClient(),
      session,
    },
    transformer: SuperJSON,
  });
}
