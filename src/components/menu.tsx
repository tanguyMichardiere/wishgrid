"use client";

import {
	Menu as HeadlessUiMenu,
	MenuButton,
	MenuItem,
	MenuItems,
	Transition,
} from "@headlessui/react";
import { cx } from "classix";
import type { Route } from "next";
import type { JSX, ReactNode } from "react";
import { Link } from "../i18n/routing";
import type { Locale } from "../types/locale";

export type Props = {
	position: "left" | "right";
	children: ReactNode;
	disabled?: boolean;
	buttonClassName?: string;
	menuClassName?: string;
	items: ReadonlyArray<
		{ key: string; children: ReactNode; className?: string } & (
			| {
					onClick: () => void;
			  }
			| {
					href: Route;
					download: string;
			  }
			| {
					href: Route;
					locale?: Locale;
			  }
		)
	>;
};

export function Menu(props: Props): JSX.Element {
	return (
		<HeadlessUiMenu as="div" className="relative inline-block">
			<MenuButton className={props.buttonClassName} disabled={props.disabled}>
				{props.children}
			</MenuButton>
			<Transition
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<MenuItems
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
								<MenuItem as="button" className={item.className} onClick={item.onClick}>
									{item.children}
								</MenuItem>
								// TODO extract a MenuItem component
								// biome-ignore lint/nursery/noNestedTernary: TODO
							) : "download" in item ? (
								<MenuItem
									as="a"
									className={item.className}
									download={item.download}
									href={item.href}
								>
									{item.children}
								</MenuItem>
							) : (
								<MenuItem
									as={Link}
									className={item.className}
									href={item.href}
									locale={item.locale}
								>
									{item.children}
								</MenuItem>
							)}
						</li>
					))}
				</MenuItems>
			</Transition>
		</HeadlessUiMenu>
	);
}
