import type { User } from "@prisma/client";

declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Session {
    user: User;
  }
}
