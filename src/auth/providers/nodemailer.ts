import Nodemailer from "next-auth/providers/nodemailer";
import { env } from "../../env";

export default Nodemailer({ server: env.AUTH_EMAIL_SERVER, from: env.AUTH_EMAIL_FROM });
