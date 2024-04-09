"use client";

import type { JSX } from "react";
import { useRef } from "react";
import { NewWishModal } from "../new-wish-modal";

type Props = {
	text: string;
};

export function NewWishButtonClient(props: Props): JSX.Element {
	const modalRef = useRef<HTMLDialogElement>(null);

	function showModal() {
		modalRef.current?.showModal();
	}

	return (
		<>
			<button className="btn mx-2 justify-center" onClick={showModal} type="button">
				{props.text}
			</button>
			<NewWishModal ref={modalRef} />
		</>
	);
}
