"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useCallback, useMemo } from "react";
import Menu from "./Menu";

type Props = {
  position: "left" | "right";
};

export default function ThemeMenu(props: Props): JSX.Element {
  const { theme, setTheme } = useTheme();

  const setSystemTheme = useCallback(
    function () {
      setTheme("system");
    },
    [setTheme],
  );

  const setDarkTheme = useCallback(
    function () {
      setTheme("dark");
    },
    [setTheme],
  );

  const setLightTheme = useCallback(
    function () {
      setTheme("light");
    },
    [setTheme],
  );

  const menuItems = useMemo(
    () => [
      { key: "system", children: "System", onClick: setSystemTheme },
      { key: "dark", children: "Dark", onClick: setDarkTheme },
      { key: "light", children: "Light", onClick: setLightTheme },
    ],
    [setSystemTheme, setDarkTheme, setLightTheme],
  );

  return (
    <Menu buttonClassName="btn" items={menuItems} menuClassName="w-48" position={props.position}>
      {theme ?? "system"}
      <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-2 h-5 w-5" />
    </Menu>
  );
}
