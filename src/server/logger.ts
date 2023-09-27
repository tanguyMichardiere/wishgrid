import pino from "pino";
import "server-only";
import { LOG_LEVEL, NODE_ENV } from "../env";

export const logger = pino({
  level: LOG_LEVEL,
  ...(NODE_ENV === "development"
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
      }
    : {}),
});
