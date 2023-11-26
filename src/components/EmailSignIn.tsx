import { useLocale } from "next-intl";
import "server-only";
import { signIn } from "../auth";
import { useServerTranslations } from "../utils/translations/server";

export default function EmailSignIn(): JSX.Element {
  const locale = useLocale();
  const t = useServerTranslations("EmailSignIn");

  async function signInAction(formData: FormData) {
    "use server";

    await signIn("email", {
      email: formData.get("email"),
      redirectTo: `/${locale !== "en" ? `${locale}` : ""}`,
    });
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
