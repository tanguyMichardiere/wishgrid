import { PrismaAdapter } from "@auth/prisma-adapter";
import type { User } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Discord from "next-auth/providers/discord";
import { NODE_ENV } from "../env";
import { createDatabaseClient } from "../server/database/createClient";
import { logger } from "../server/logger";
import { mockProvider } from "./mockProvider";

const adapter = PrismaAdapter(createDatabaseClient(logger));

const providers: Array<Provider> = [Discord];
if (NODE_ENV === "development") {
  providers.push(mockProvider);
}

export const nextAuthConfig = {
  adapter,
  providers,
  callbacks: {
    session({ session, user }) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      session.user = user as User;
      return session;
    },
  },
} satisfies NextAuthConfig;

const nextAuth = NextAuth(nextAuthConfig);

export const { handlers, auth } = nextAuth;
export const signIn = nextAuth.signIn.bind(nextAuth);
export const signOut = nextAuth.signOut.bind(nextAuth);
