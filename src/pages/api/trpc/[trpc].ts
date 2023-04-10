import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { log } from "next-axiom";
import { createContext } from "../../../server/context";
import { router } from "../../../server/router";

export default createNextApiHandler({
  router,
  createContext,
  onError({ error, ctx, req }) {
    const reqLog = ctx?.log ?? log.with(req.query);
    reqLog.debug("error", { error });
    if (error.code === "INTERNAL_SERVER_ERROR") {
      if (error.cause instanceof Prisma.PrismaClientKnownRequestError) {
        const prismaError = error.cause;
        if (prismaError.code === "P2025") {
          throw new TRPCError({ code: "NOT_FOUND", cause: prismaError });
        }
      }
      reqLog.error("unhandled internal server error", { error });
    }
  },
});
