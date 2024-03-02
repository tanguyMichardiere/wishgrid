/* eslint-disable no-console */

import "server-only";
import { env } from "../env";

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

export const logger = {
  info: env.LOG_LEVEL === "info" ? console.log : noop,
  warning: ["info", "warning"].includes(env.LOG_LEVEL)
    ? function (message: string, ...optionalParams: Array<unknown>): void {
        console.warn(`WARNING: ${message}`, ...optionalParams);
      }
    : noop,
  error: console.error,
};
