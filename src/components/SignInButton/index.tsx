import cx from "classix";
import { useLocale } from "next-intl";
import "server-only";
import { signIn } from "../../auth";
import { useServerTranslations } from "../../utils/translations/server";
import DiscordIcon from "./DiscordIcon";

const providers = {
  discord: {
    buttonClassName: "bg-[#5865F2] text-white hover:bg-[rgba(88,101,242,0.8)]",
    icon: <DiscordIcon />,
    name: "Discord",
  },
};

type Props = {
  provider: keyof typeof providers;
};

export default function SignInButton(props: Props): JSX.Element {
  const locale = useLocale();
  const t = useServerTranslations("SignInButton");

  async function signInAction() {
    "use server";

    await signIn(props.provider, { redirectTo: `/${locale !== "en" ? `${locale}` : ""}` });
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form action={signInAction}>
      <button className={cx("btn", providers[props.provider].buttonClassName)}>
        {providers[props.provider].icon}
        {t("text", { provider: providers[props.provider].name })}
      </button>
    </form>
  );
}
