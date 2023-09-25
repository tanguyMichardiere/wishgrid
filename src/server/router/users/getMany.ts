import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { User, UserId } from "../../db/types/user";
import { getUsers } from "./getUsers";

export const getMany = procedure
  .input(z.object({ userId: z.array(UserId) }))
  .output(z.array(User))
  .query(async function ({ ctx, input }) {
    return getUsers(input.userId, ctx);
  });
