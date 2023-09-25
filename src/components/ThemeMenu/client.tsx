"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useCallback, useMemo } from "react";
import { usePreviousValue } from "../../hooks/usePreviousValue";
import type { Props as MenuProps } from "../Menu";
import Menu from "../Menu";

const themes = ["system", "dark", "light"] as const;

export type Props = Pick<MenuProps, "position"> & {
  system: string;
  dark: string;
  light: string;
};

export default function ThemeMenuClient(props: Props): JSX.Element {
  // `theme` will be undefined on server and a string on client
  const { theme, setTheme } = useTheme();
  // so to prevent hydration mismatch, always display a loading state on first render
  const displayedTheme = usePreviousValue(theme);

  const themeDisplay = useCallback(
    function (theme?: string) {
      switch (theme) {
        case "system":
          return props.system;
        case "dark":
          return props.dark;
        case "light":
          return props.light;
        default:
          return <span className="loading loading-spinner" />;
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
    <Menu
      buttonClassName="btn"
      disabled={displayedTheme === undefined}
      items={menuItems}
      menuClassName="w-48"
      position={props.position}
    >
      {themeDisplay(displayedTheme)}
      <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-2 h-5 w-5" />
    </Menu>
  );
}
