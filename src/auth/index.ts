import { PrismaAdapter } from "@auth/prisma-adapter";
import type { User } from "@prisma/client";
import type { Session } from "next-auth";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import "server-only";
import { env } from "../env";
import { createDatabaseClient } from "../server/database/createClient";
import { logger } from "../server/logger";
import Email from "./providers/email";
import Mock from "./providers/mock";

const databaseClient = createDatabaseClient(logger);
const adapter = PrismaAdapter(databaseClient);
adapter.createUser = async (data) =>
  databaseClient.user.create({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    data: { ...data, name: data.name ?? data.email.split("@", 2)[0]! },
  });

const nextAuth = NextAuth({
  adapter,
  providers: [Discord, env.NODE_ENV !== "production" ? Mock : Email],
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
  debug: ["debug", "trace"].includes(env.LOG_LEVEL),
});

export const { handlers, auth } = nextAuth;
export const signIn = nextAuth.signIn.bind(nextAuth);
export const signOut = nextAuth.signOut.bind(nextAuth);
