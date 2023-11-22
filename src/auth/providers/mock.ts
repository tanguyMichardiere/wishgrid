import Email from "next-auth/providers/email";
import { logger } from "../../server/logger";

export default Email({
  sendVerificationRequest({ url }) {
    // TODO: wait for fix in next-auth
    logger.debug(url.replace("//callback/", "/api/auth/callback/"));
  },
});
