import type { User } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Session {
    // prisma's User, set in pages/api/auth/[...nextauth].ts
    user: User;
  }
}
