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
	debug(this: void, message: unknown, ...optionalParams: unknown[]): void {
		if (level[env.LOG_LEVEL] <= level.debug) {
			// biome-ignore lint/suspicious/noConsoleLog lint/nursery/noConsole:
			console.log(message, ...optionalParams);
		}
	},
	info(this: void, message: unknown, ...optionalParams: unknown[]): void {
		if (level[env.LOG_LEVEL] <= level.info) {
			// biome-ignore lint/suspicious/noConsoleLog lint/nursery/noConsole:
			console.log(message, ...optionalParams);
		}
	},
	warning(this: void, message: string, ...optionalParams: unknown[]): void {
		if (level[env.LOG_LEVEL] <= level.warning) {
			// biome-ignore lint/nursery/noConsole:
			console.warn(message, ...optionalParams);
		}
	},
	error(this: void, message: unknown, ...optionalParams: unknown[]): void {
		if (level[env.LOG_LEVEL] <= level.error) {
			// biome-ignore lint/nursery/noConsole:
			console.error(message, ...optionalParams);
		}
	},
};
