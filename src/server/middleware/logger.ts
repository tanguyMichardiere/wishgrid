import { experimental_standaloneMiddleware as standaloneMiddleware } from "@trpc/server";
import "server-only";
import { logger as baseLogger } from "../logger";

export const logger = standaloneMiddleware().create(async function ({
  ctx,
  type,
  path,
  getRawInput,
  next,
}) {
  const logger = baseLogger.child({ type, path, input: await getRawInput() });
  logger.debug(`${type.toUpperCase()} ${path}`);
  return next({ ctx: { ...ctx, logger } });
});
