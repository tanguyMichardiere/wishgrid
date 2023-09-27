import { clerkClient } from "@clerk/nextjs";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { User } from "../../db/types/user";

export const search = procedure
  .input(z.object({ query: z.string().min(4).max(32) }))
  .output(z.array(User))
  .query(async function ({ ctx, input }) {
    ctx.logger.debug({ query: input.query }, `searching users with '${input.query}'`);
    return clerkClient.users.getUserList({ query: input.query });
  });
