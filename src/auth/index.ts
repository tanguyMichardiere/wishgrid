import { PrismaAdapter } from "@auth/prisma-adapter";
import type { User } from "@prisma/client";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { NODE_ENV } from "../env";
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
  // @ts-expect-error wrong types?
  providers: [Discord, NODE_ENV === "development" ? Mock : Email],
  pages: {
    signIn: "/sign-in",
    signOut: "/",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    session({ session, user }) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      session.user = user as User;
      return session;
    },
  },
});

export const { handlers, auth } = nextAuth;
export const signIn = nextAuth.signIn.bind(nextAuth);
export const signOut = nextAuth.signOut.bind(nextAuth);
