import { clerkClient } from "@clerk/nextjs";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { User, UserId } from "../../db/types/user";

export const get = procedure
  .input(z.object({ userId: UserId }))
  .output(User)
  .query(async function ({ ctx, input }) {
    ctx.log.debug(`retrieving ${input.userId}`, { userId: input.userId });
    return clerkClient.users.getUser(input.userId);
  });
