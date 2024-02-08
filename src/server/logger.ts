import pino from "pino";
import "server-only";
import { env } from "../env";

export const logger = pino({
  level: env.LOG_LEVEL,
  ...(env.NODE_ENV === "development"
    ? { transport: { target: "pino-pretty", options: { colorize: true } } }
    : {}),
});
