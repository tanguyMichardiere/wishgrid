import * as CSV from "csv-stringify/sync";
import { getTranslations } from "next-intl/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "../../../../../../auth";
import { createDatabaseClient } from "../../../../../../server/database/createClient";
import { logger as baseLogger } from "../../../../../../server/logger";
import { generateDocx } from "./generateDocx";
import { generatePdf } from "./generatePdf";
import { Params } from "./params";

const Params = z.object({
  locale: z.enum(["en", "fr"]),
  format: z.enum(["json", "csv", "docx", "pdf"]),
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
        orderBy: { title: "asc" },
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
      return new NextResponse(
        CSV.stringify(localizedWishes, {
          columns: [t("title"), t("description"), t("link")],
          header: true,
          cast: {
            string(value) {
              return value.replaceAll("\n", "\\n");
            },
          },
        }),
      );
    case "docx":
      return new NextResponse(await generateDocx(wishes));
    case "pdf": {
      return new NextResponse(await generatePdf(wishes));
    }
  }
}
