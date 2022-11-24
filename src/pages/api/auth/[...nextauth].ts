import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";

import MockProvider from "../../../utils/next-auth/MockProvider";

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(new PrismaClient()),
  providers: [MockProvider()],
  callbacks: {
    session({ session, user }) {
      // @ts-expect-error incorrect types
      session.user = user;
      return session;
    },
  },
};

export default NextAuth(nextAuthOptions);
