import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import "server-only";
import type { Props as ClientProps } from "./client";

const ThemeMenuClient = dynamic(() => import("./client"), {
  ssr: false,
});

type Props = Pick<ClientProps, "position">;

export default function ThemeMenu(props: Props): JSX.Element {
  const t = useTranslations("ThemeMenu");

  return (
    <ThemeMenuClient
      dark={t("dark")}
      light={t("light")}
      position={props.position}
      system={t("system")}
    />
  );
}
