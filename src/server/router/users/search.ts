import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { User } from "../../database/types/user";

export const search = procedure
  .input(z.object({ query: z.string().min(4).max(32) }))
  .output(z.array(User))
  .query(async function ({ ctx, input }) {
    return ctx.db.user.findMany({
      select: { id: true, name: true, image: true },
      where: { name: { contains: input.query, mode: "insensitive" } },
      orderBy: { name: "asc" },
    });
  });
