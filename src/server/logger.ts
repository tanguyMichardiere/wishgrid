/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

import "server-only";
import { env } from "../env";

export const logger = {
  info(this: void, message: unknown, ...optionalParams: Array<unknown>): void {
    if (env.LOG_LEVEL === "info") {
      console.log(message, optionalParams);
    }
  },
  warning(this: void, message: string, ...optionalParams: Array<unknown>): void {
    if (["info", "warning"].includes(env.LOG_LEVEL)) {
      console.warn(`WARNING: ${message}`, ...optionalParams);
    }
  },
  error(this: void, message: unknown, ...optionalParams: Array<unknown>): void {
    console.error(message, optionalParams);
  },
};
