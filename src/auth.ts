import { PrismaAdapter } from "@auth/prisma-adapter";
import type { User } from "@prisma/client";
import type { Session } from "next-auth";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import Resend from "next-auth/providers/resend";
import "server-only";
import { env } from "./env";
import { databaseClient } from "./server/database/client";
import { logger } from "./server/logger";

const adapter = PrismaAdapter(databaseClient);
adapter.createUser = async (data) =>
  databaseClient.user.create({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    data: { ...data, name: data.name ?? data.email.split("@", 2)[0]! },
  });

const nextAuth = NextAuth({
  adapter,
  // TODO: customize email
  providers: [
    Discord,
    Resend(
      env.NODE_ENV !== "development"
        ? { from: "WishGrid <no-reply@wishgrid.app>" }
        : {
            sendVerificationRequest({ url }) {
              logger.info(url);
            },
          },
    ),
  ],
  basePath: "/api/auth",
  pages: {
    signIn: "/sign-in",
    signOut: "/",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    // @ts-expect-error in database mode we always have `user` and not `token`
    session({ session, user }: { session: Session; user: User }) {
      session.user = user;
      return session;
    },
  },
  debug: env.NODE_ENV === "development",
  logger: {
    debug: logger.info,
    warn: logger.error,
    error: logger.error,
  },
});

export const { handlers, auth } = nextAuth;
export const signIn = nextAuth.signIn.bind(nextAuth);
export const signOut = nextAuth.signOut.bind(nextAuth);
