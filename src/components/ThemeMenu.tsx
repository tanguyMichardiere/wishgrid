"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";
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
    [setTheme]
  );

  const setDarkTheme = useCallback(
    function () {
      setTheme("dark");
    },
    [setTheme]
  );

  const setLightTheme = useCallback(
    function () {
      setTheme("light");
    },
    [setTheme]
  );

  return (
    <Menu
      buttonClassName="btn"
      items={[
        { key: "system", children: "System", onClick: setSystemTheme },
        { key: "dark", children: "Dark", onClick: setDarkTheme },
        { key: "light", children: "Light", onClick: setLightTheme },
      ]}
      menuClassName="w-48"
      position={props.position}
    >
      {theme ?? "Theme"}
    </Menu>
  );
}
