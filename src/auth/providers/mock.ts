import Email from "next-auth/providers/email";
import { logger } from "../../server/logger";

export default Email({
  sendVerificationRequest({ url }) {
    logger.info(url);
  },
});
