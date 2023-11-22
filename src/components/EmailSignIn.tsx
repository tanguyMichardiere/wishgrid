import { useLocale } from "next-intl";
import { redirect } from "next/navigation";
import "server-only";
import { signIn } from "../auth";
import { logger } from "../server/logger";
import { useServerTranslations } from "../utils/translations/server";

export default function EmailSignIn(): JSX.Element {
  const locale = useLocale();
  const t = useServerTranslations("EmailSignIn");

  async function signInAction(formData: FormData) {
    "use server";

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const url = (await signIn("email", {
      email: formData.get("email"),
      // redirect: false,
      // redirectTo: `/${locale !== "en" ? `${locale}` : ""}`,
    })) as string;
    logger.warn(url);
    // TODO: wait for fix in next-auth
    redirect(url.replace("//verify-request", "/api/auth/verify-request"));
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form action={signInAction} className="flex flex-col gap-2">
      <input
        className="input input-bordered w-72"
        name="email"
        placeholder={t("placeholder")}
        required
        type="email"
      />
      <button className="btn">{t("buttonText")}</button>
    </form>
  );
}
