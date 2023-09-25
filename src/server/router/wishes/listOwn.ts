import { asc, eq } from "drizzle-orm";
import "server-only";
import { z } from "zod";
import { procedure } from "../..";
import { wishes } from "../../db/schema/wishes";
import { OwnWish } from "../../db/types/wishes";
import { httpDb } from "../../middleware/httpDb";

export const listOwn = procedure
  .use(httpDb)
  .output(z.array(OwnWish))
  .query(async function ({ ctx }) {
    return ctx.db.query.wishes.findMany({
      columns: { id: true, title: true, description: true, link: true },
      where: eq(wishes.userId, ctx.user.id),
      orderBy: [asc(wishes.title)],
    });
  });
