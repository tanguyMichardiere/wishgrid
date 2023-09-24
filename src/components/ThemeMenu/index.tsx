import { useServerTranslations } from "../../utils/translations/server";
import type { Props as ClientProps } from "./client";
import ThemeMenuClient from "./client";

type Props = Pick<ClientProps, "position">;

export default function ThemeMenu(props: Props): JSX.Element {
  const t = useServerTranslations("ThemeMenu");

  return (
    <ThemeMenuClient
      dark={t("dark")}
      light={t("light")}
      position={props.position}
      system={t("system")}
    />
  );
}
