"use client";

import type { JSX } from "react";
import { useRef } from "react";
import type { OwnWish } from "../server/database/types/wishes";
import { Card } from "./card";
import { OwnWishModal } from "./own-wish-modal";

type Props = { wish: OwnWish };

export function OwnWishPreviewCard(props: Props): JSX.Element {
	const modalRef = useRef<HTMLDialogElement>(null);

	function showModal() {
		modalRef.current?.showModal();
	}

	return (
		<>
			<button className="w-full" onClick={showModal} type="button">
				<Card>
					<div>{props.wish.title}</div>
				</Card>
			</button>
			<OwnWishModal ref={modalRef} wish={props.wish} />
		</>
	);
}
