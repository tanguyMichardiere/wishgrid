import type { Provider } from "next-auth/providers";

// https://github.com/navikt/mock-oauth2-server
// podman run -p 8080:8080 -h localhost ghcr.io/navikt/mock-oauth2-server:2.0.1
export const mockProvider = {
  id: "mock",
  name: "Mock",
  type: "oidc",
  issuer: "http://localhost:8080/default",
  clientId: "client_id",
  clientSecret: "client_secret",
  profile({ sub, jti }: { sub: string; jti: string }) {
    return { id: jti, name: sub, email: `${sub}@mock` };
  },
  allowDangerousEmailAccountLinking: true,
} satisfies Provider;
