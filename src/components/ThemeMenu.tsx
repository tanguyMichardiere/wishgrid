"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import Menu from "./Menu";

type Props = {
  position: "left" | "right";
};

export default function ThemeMenu(props: Props): JSX.Element {
  const { theme, setTheme } = useTheme();

  const menuItems = useMemo(
    () => [
      {
        key: "system",
        children: "System",
        onClick() {
          setTheme("system");
        },
      },
      {
        key: "dark",
        children: "Dark",
        onClick() {
          setTheme("dark");
        },
      },
      {
        key: "light",
        children: "Light",
        onClick() {
          setTheme("light");
        },
      },
    ],
    [setTheme],
  );

  return (
    <Menu buttonClassName="btn" items={menuItems} menuClassName="w-48" position={props.position}>
      {theme ?? "system"}
      <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-2 h-5 w-5" />
    </Menu>
  );
}
