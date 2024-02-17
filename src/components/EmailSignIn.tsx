import type { JSX } from "react";
import "server-only";
import { signIn } from "../auth";
import { useServerTranslations } from "../utils/translations/server";

type Props = {
  redirectTo: string;
};

export default function EmailSignIn(props: Props): JSX.Element {
  const t = useServerTranslations("EmailSignIn");

  async function signInAction(formData: FormData) {
    "use server";

    await signIn("nodemailer", { email: formData.get("email"), redirectTo: props.redirectTo });
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
