import Nodemailer from "next-auth/providers/nodemailer";
import { logger } from "../../server/logger";

export default Nodemailer({
  server: {},
  sendVerificationRequest({ url }) {
    logger.info(url);
  },
});
