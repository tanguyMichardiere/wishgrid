import { getRequestConfig } from "next-intl/server";
import {} from "react";

export default getRequestConfig(async ({ locale }) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  messages: (await import(`./messages/${locale}.json`)).default,
}));
