import Email from "next-auth/providers/email";
import { env } from "../../env";

export default Email({ server: env.AUTH_EMAIL_SERVER, from: env.AUTH_EMAIL_FROM });
