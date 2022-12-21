import type { EmailConfig } from "next-auth/providers/email";
import { log } from "next-axiom";

export default function MockProvider(): EmailConfig {
  if (process.env["VERCEL_ENV"] === "production") {
    throw new Error("using the mock auth provider in a production environment");
  }
  return {
    id: "mock",
    name: "Mock",
    type: "email",
    server: "localhost",
    sendVerificationRequest({ url }) {
      log.debug(url);
    },
    options: {},
  };
}
