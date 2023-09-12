import { experimental_standaloneMiddleware as standaloneMiddleware } from "@trpc/server";
import { Logger } from "next-axiom";
import "server-only";

export const logger = standaloneMiddleware().create(async function ({
  ctx,
  type,
  path,
  rawInput,
  next,
}) {
  const log = new Logger({ args: { type, input: rawInput } });
  log.debug(`${type.toUpperCase()} ${path}`);
  const result = await next({ ctx: { ...ctx, log: log.with({ path }) } });
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await log.flush();
  } catch {
    // ignore
  }
  return result;
});
