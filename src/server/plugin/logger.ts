import { initTRPC } from "@trpc/server";
import "server-only";
import { logger as baseLogger } from "../logger";

const t = initTRPC.create();

export const loggerPlugin = t.procedure.use(async function ({
  ctx,
  type,
  path,
  getRawInput,
  next,
}) {
  const logger = baseLogger.child({ context: "trpc", type, path, input: await getRawInput() });
  logger.debug(`${type.toUpperCase()} ${path}`);
  return next({ ctx: { ...ctx, logger } });
});
