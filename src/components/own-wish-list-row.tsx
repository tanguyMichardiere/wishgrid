"use client";

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
			<button
				className="cursor-pointer list-row transition-colors hover:bg-base-200"
				onClick={showModal}
				type="button"
			>
				<div className="flex list-col-grow items-center">{props.wish.title}</div>
			</button>
			<OwnWishModal ref={modalRef} wish={props.wish} />
		</>
	);
}
