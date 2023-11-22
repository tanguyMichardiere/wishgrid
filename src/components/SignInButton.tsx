import cx from "classix";
import { useLocale } from "next-intl";
import Image from "next/image";
import { redirect } from "next/navigation";
import "server-only";
import { signIn } from "../auth";
import { useServerTranslations } from "../utils/translations/server";

const providers = {
  discord: {
    buttonClassName: "bg-[#5865F2] text-white hover:bg-[rgba(88,101,242,0.8)]",
    icon: (
      <Image
        alt="discord"
        height={24}
        src="https://authjs.dev/img/providers/discord.svg"
        width={24}
      />
    ),
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

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const url = (await signIn(props.provider, {
      redirect: false,
      redirectTo: `/${locale !== "en" ? `${locale}` : ""}`,
    })) as string;
    // TODO: wait for fix in next-auth
    redirect(url.replace("%2F%2Fcallback%2F", "%2Fapi%2Fauth%2Fcallback%2F"));
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
