"use client";

import { Menu as HeadlessUIMenu, Transition } from "@headlessui/react";
import { cx } from "classix";
import type { Route } from "next";
import type { JSX, ReactNode } from "react";
import { Fragment } from "react";
import { Link } from "../navigation";

export type Props = {
  position: "left" | "right";
  children: ReactNode;
  disabled?: boolean;
  buttonClassName?: string;
  menuClassName?: string;
  items: ReadonlyArray<
    { key: string; children: ReactNode; className?: string } & (
      | { onClick: () => void }
      | { href: Route; download: string }
      | { href: Route; locale?: Locale }
    )
  >;
};

export default function Menu(props: Props): JSX.Element {
  return (
    <HeadlessUIMenu as="div" className="relative inline-block">
      <HeadlessUIMenu.Button className={props.buttonClassName} disabled={props.disabled}>
        {props.children}
      </HeadlessUIMenu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HeadlessUIMenu.Items
          as="ul"
          className={cx(
            "menu absolute z-50 mt-2 max-h-72 flex-nowrap overflow-y-auto rounded-md bg-base-100 shadow-md",
            props.position === "left" && "right-0",
            props.position === "right" && "left-0",
            props.menuClassName,
          )}
        >
          {props.items.map((item) => (
            <li key={item.key}>
              {"onClick" in item ? (
                <HeadlessUIMenu.Item as="button" className={item.className} onClick={item.onClick}>
                  {item.children}
                </HeadlessUIMenu.Item>
              ) : "download" in item ? (
                <HeadlessUIMenu.Item
                  as="a"
                  className={item.className}
                  download={item.download}
                  href={item.href}
                >
                  {item.children}
                </HeadlessUIMenu.Item>
              ) : (
                <HeadlessUIMenu.Item
                  as={Link}
                  className={item.className}
                  href={item.href}
                  locale={item.locale}
                >
                  {item.children}
                </HeadlessUIMenu.Item>
              )}
            </li>
          ))}
        </HeadlessUIMenu.Items>
      </Transition>
    </HeadlessUIMenu>
  );
}
