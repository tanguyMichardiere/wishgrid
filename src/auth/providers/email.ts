import type { Provider } from "next-auth/providers";
import Email from "next-auth/providers/email";
import { AUTH_EMAIL_FROM, AUTH_EMAIL_SERVER } from "../../env";

const Inner = Email({ server: AUTH_EMAIL_SERVER, from: AUTH_EMAIL_FROM });

const Outer: Provider = {
  ...Inner,
  async sendVerificationRequest({ url, ...params }) {
    return Inner.sendVerificationRequest({
      ...params,
      // TODO: wait for fix in next-auth
      url: url.replace("//callback/", "/api/auth/callback/"),
    });
  },
};

export default Outer;
