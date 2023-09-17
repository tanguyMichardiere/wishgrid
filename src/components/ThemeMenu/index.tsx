import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import "server-only";
import type { Props } from "./props";

const ThemeMenuClient = dynamic(() => import("./client"), {
  ssr: false,
});

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
