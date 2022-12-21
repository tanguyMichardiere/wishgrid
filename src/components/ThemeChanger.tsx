import { Fragment, useCallback } from "react";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";

export default function ThemeChanger(): JSX.Element {
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
    <div className="flex items-center justify-between">
      <p>Theme</p>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium shadow-md dark:bg-gray-700">
          {theme !== undefined
            ? { system: "System", dark: "Dark", light: "Light" }[theme]
            : "Theme"}
          <ChevronDownIcon aria-hidden="true" className="ml-2 -mr-1 h-5 w-5" />
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-1">
              <Menu.Item
                as="button"
                className="group flex w-full items-center rounded-md px-2 py-2 text-sm ui-active:bg-violet-500 ui-active:text-white ui-not-active:text-gray-900"
                onClick={setSystemTheme}
              >
                System
              </Menu.Item>
            </div>
            <div className="p-1">
              <Menu.Item
                as="button"
                className="group flex w-full items-center rounded-md px-2 py-2 text-sm ui-active:bg-violet-500 ui-active:text-white ui-not-active:text-gray-900"
                onClick={setDarkTheme}
              >
                Dark
              </Menu.Item>
            </div>
            <div className="p-1">
              <Menu.Item
                as="button"
                className="group flex w-full items-center rounded-md px-2 py-2 text-sm ui-active:bg-violet-500 ui-active:text-white ui-not-active:text-gray-900"
                onClick={setLightTheme}
              >
                Light
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
