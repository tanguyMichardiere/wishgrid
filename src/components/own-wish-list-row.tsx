"use client";

import { EyeIcon } from "@heroicons/react/24/outline";
import type { JSX } from "react";
import { useRef } from "react";
import type { OwnWish } from "../server/database/types/wishes";
import { OwnWishModal } from "./own-wish-modal";

type Props = { wish: OwnWish };

export function OwnWishListRow(props: Props): JSX.Element {
	const modalRef = useRef<HTMLDialogElement>(null);

	function showModal() {
		modalRef.current?.showModal();
	}

	return (
		<>
			<div className="flex list-col-grow items-center">{props.wish.title}</div>
			<button className="btn btn-circle btn-ghost" onClick={showModal} type="button">
				<EyeIcon className="h-6 w-6" />
			</button>
			<OwnWishModal ref={modalRef} wish={props.wish} />
		</>
	);
}
