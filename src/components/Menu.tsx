"use client";

import { Menu as HeadlessUiMenu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { cx } from "classix";
import Link from "next/link";
import type { ReactNode } from "react";
import { Fragment } from "react";

type Props = {
  position: "left" | "right";
  children: ReactNode;
  buttonClassName: string;
  menuClassName: string;
  items: Array<{ key: string; children: ReactNode } & ({ onClick: () => void } | { href: string })>;
};

export default function Menu(props: Props): JSX.Element {
  return (
    <HeadlessUiMenu as="div" className="relative inline-block">
      <HeadlessUiMenu.Button className={props.buttonClassName}>
        {props.children}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-2 h-5 w-5" />
      </HeadlessUiMenu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HeadlessUiMenu.Items
          as="ul"
          className={cx(
            "menu absolute mt-2 w-fit rounded-md bg-base-100 shadow-md",
            props.position === "left" && "right-0",
            props.position === "right" && "left-0",
            props.menuClassName
          )}
        >
          {props.items.map((item) => (
            <li key={item.key}>
              {"onClick" in item ? (
                <HeadlessUiMenu.Item as="button" onClick={item.onClick}>
                  {item.children}
                </HeadlessUiMenu.Item>
              ) : (
                <HeadlessUiMenu.Item as={Link} href={item.href}>
                  {item.children}
                </HeadlessUiMenu.Item>
              )}
            </li>
          ))}
        </HeadlessUiMenu.Items>
      </Transition>
    </HeadlessUiMenu>
  );
}
