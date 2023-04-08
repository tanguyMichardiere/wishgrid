"use client";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { cx } from "classix";
import { useTheme } from "next-themes";
import { Fragment, useCallback } from "react";

type Props = {
  position?: "left" | "right";
};

export default function ThemeMenu({ position = "left" }: Props): JSX.Element {
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
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="btn">
        {theme}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-2 h-5 w-5" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className={cx(
            "menu absolute mt-2 w-48 rounded-md bg-base-100 shadow-md",
            position === "left" && "right-0",
            position === "right" && "left-0"
          )}
        >
          <li>
            <Menu.Item as="button" onClick={setSystemTheme}>
              System
            </Menu.Item>
          </li>
          <li>
            <Menu.Item as="button" onClick={setDarkTheme}>
              Dark
            </Menu.Item>
          </li>
          <li>
            <Menu.Item as="button" onClick={setLightTheme}>
              Light
            </Menu.Item>
          </li>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
