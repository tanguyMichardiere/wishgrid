import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import DiscordProvider from "next-auth/providers/discord";
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, NODE_ENV } from "../../../env";
import MockProvider from "../../../utils/next-auth/MockProvider";

const providers: Array<Provider> = [];

if (NODE_ENV === "development") {
  providers.push(MockProvider());
}

if (DISCORD_CLIENT_ID !== undefined && DISCORD_CLIENT_SECRET !== undefined) {
  providers.push(
    DiscordProvider({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
    })
  );
}

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(new PrismaClient()),
  providers,
  callbacks: {
    session({ session, user }) {
      // @ts-expect-error incorrect types, user comes from prisma
      session.user = user;
      return session;
    },
  },
};

export default NextAuth(nextAuthOptions);
