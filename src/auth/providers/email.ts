import Email from "next-auth/providers/email";
import { AUTH_EMAIL_FROM, AUTH_EMAIL_SERVER } from "../../env";

const Provider = Email({ server: AUTH_EMAIL_SERVER, from: AUTH_EMAIL_FROM });

Provider.sendVerificationRequest = async function sendVerificationRequest({ url, ...params }) {
  return Provider.sendVerificationRequest({
    ...params,
    // TODO: wait for fix in next-auth
    url: url.replace("//callback/", "/api/auth/callback/"),
  });
};

export default Provider;
