import Email from "next-auth/providers/email";
import { AUTH_EMAIL_FROM, AUTH_EMAIL_SERVER } from "../../env";

export default Email({ server: AUTH_EMAIL_SERVER, from: AUTH_EMAIL_FROM });
