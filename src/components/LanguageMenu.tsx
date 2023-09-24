"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useLocale } from "next-intl";
import { usePathname } from "next-intl/client";
import { useMemo } from "react";
import type { Props as MenuProps } from "./Menu";
import Menu from "./Menu";

const localeDisplay = {
  en: "English",
  fr: "Français",
};

type Props = Pick<MenuProps, "position">;

export default function LanguageMenu(props: Props): JSX.Element {
  const locale = useLocale();
  const pathname = usePathname();

  const menuItems = useMemo(
    () =>
      [
        { key: "en", children: localeDisplay.en, href: pathname, locale: "en" },
        { key: "fr", children: localeDisplay.fr, href: pathname, locale: "fr" },
      ] as const,
    [pathname],
  );

  return (
    <Menu buttonClassName="btn" items={menuItems} menuClassName="w-48" position={props.position}>
      {localeDisplay[locale]}
      <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-2 h-5 w-5" />
    </Menu>
  );
}
