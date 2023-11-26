import * as CSV from "csv-stringify/sync";
import { getTranslations } from "next-intl/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "../../../../../../auth";
import { createDatabaseClient } from "../../../../../../server/database/createClient";
import { logger as baseLogger } from "../../../../../../server/logger";
import { Params } from "./params";

const Params = z.object({
  locale: z.enum(["en", "fr"]),
  // TODO: docx, pdf
  format: z.enum(["json", "csv"]),
});

export async function GET(
  _request: NextRequest,
  context: { params: Params },
): Promise<NextResponse> {
  const session = await auth();
  if (session === null) {
    return NextResponse.json(null, { status: 401 });
  }

  const params = Params.safeParse(context.params);
  if (!params.success) {
    return NextResponse.json(null, { status: 404 });
  }
  const { locale, format } = params.data;

  const t = await getTranslations({ locale, namespace: "wish-export" });

  const logger = baseLogger.child({});
  const db = createDatabaseClient(logger);

  const { wishes } = await db.user.findUniqueOrThrow({
    include: {
      wishes: {
        select: { title: true, description: true, link: true },
        where: { reservedById: null },
      },
    },
    where: { id: session.user.id },
  });

  const localizedWishes = wishes.map(({ title, description, link }) => ({
    [t("title")]: title,
    [t("description")]: description,
    [t("link")]: link,
  }));

  switch (format) {
    case "json":
      return new NextResponse(JSON.stringify(localizedWishes, undefined, 2));
    case "csv":
      return new NextResponse(CSV.stringify(localizedWishes, { header: true }));
  }
}
