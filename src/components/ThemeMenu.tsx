"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import type { JSX } from "react";
import { useMemo } from "react";
import { usePreviousValue } from "../hooks/previousValue";
import { capitalize } from "../utils/strings";
import type { Props as MenuProps } from "./Menu";
import Menu from "./Menu";

const themes = [
  "system",
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

type Props = Pick<MenuProps, "position">;

export default function ThemeMenu(props: Props): JSX.Element {
  // `theme` will be undefined on server and a string on client
  const { theme, setTheme } = useTheme();
  // so to prevent hydration mismatch, always display a loading state on first render
  const displayedTheme = usePreviousValue(theme);

  const menuItems = useMemo(
    () =>
      themes.map((theme) => ({
        key: theme,
        children: capitalize(theme),
        onClick() {
          setTheme(theme);
        },
      })),
    [setTheme],
  );

  return (
    <Menu
      buttonClassName="btn"
      disabled={displayedTheme === undefined}
      items={menuItems}
      menuClassName="w-48"
      position={props.position}
    >
      {displayedTheme !== undefined ? (
        capitalize(displayedTheme)
      ) : (
        <span className="loading loading-spinner" />
      )}
      <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-2 h-5 w-5" />
    </Menu>
  );
}
