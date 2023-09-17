"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useCallback, useMemo } from "react";
import type { Props as MenuProps } from "../Menu";
import Menu from "../Menu";

const themes = ["system", "dark", "light"] as const;

export type Props = Pick<MenuProps, "position"> & {
  system: string;
  dark: string;
  light: string;
};

export default function ThemeMenuClient(props: Props): JSX.Element {
  const { theme, setTheme } = useTheme();

  const themeDisplay = useCallback(
    function (theme?: string) {
      switch (theme) {
        case "dark":
          return props.dark;
        case "light":
          return props.light;
        default:
          return props.system;
      }
    },
    [props.dark, props.light, props.system],
  );

  const menuItems = useMemo(
    () =>
      themes.map((theme) => ({
        key: theme,
        children: themeDisplay(theme),
        onClick() {
          setTheme(theme);
        },
      })),
    [themeDisplay, setTheme],
  );

  return (
    <Menu buttonClassName="btn" items={menuItems} menuClassName="w-48" position={props.position}>
      {themeDisplay(theme)}
      <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-2 h-5 w-5" />
    </Menu>
  );
}
