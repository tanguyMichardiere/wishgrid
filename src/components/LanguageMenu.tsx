"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import type { Route } from "next";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import type { Props as MenuProps } from "./Menu";
import Menu from "./Menu";

const localeDisplay = {
  en: "English",
  fr: "Français",
};

type Props = Pick<MenuProps, "position"> & {
  href: Route;
};

export default function LanguageMenu(props: Props): JSX.Element {
  const locale = useLocale();

  const menuItems = useMemo(
    () =>
      [
        { key: "en", children: localeDisplay.en, href: props.href, locale: "en" },
        { key: "fr", children: localeDisplay.fr, href: props.href, locale: "fr" },
      ] as const,
    [props.href],
  );

  return (
    <Menu buttonClassName="btn" items={menuItems} menuClassName="w-48" position={props.position}>
      {localeDisplay[locale]}
      <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-2 h-5 w-5" />
    </Menu>
  );
}
