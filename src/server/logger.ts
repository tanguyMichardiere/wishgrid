/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-invalid-void-type */

import "server-only";
import { env } from "../env";

const level = {
  debug: 0,
  info: 1,
  warning: 2,
  error: 3,
  silent: 4,
} satisfies Record<typeof env.LOG_LEVEL, number>;

export const logger = {
  debug(this: void, message: unknown, ...optionalParams: Array<unknown>): void {
    if (level[env.LOG_LEVEL] <= level.debug) {
      console.log(message, ...optionalParams);
    }
  },
  info(this: void, message: unknown, ...optionalParams: Array<unknown>): void {
    if (level[env.LOG_LEVEL] <= level.info) {
      console.log(message, ...optionalParams);
    }
  },
  warning(this: void, message: string, ...optionalParams: Array<unknown>): void {
    if (level[env.LOG_LEVEL] <= level.warning) {
      console.warn(`WARNING: ${message}`, ...optionalParams);
    }
  },
  error(this: void, message: unknown, ...optionalParams: Array<unknown>): void {
    if (level[env.LOG_LEVEL] <= level.error) {
      console.error(message, ...optionalParams);
    }
  },
};
