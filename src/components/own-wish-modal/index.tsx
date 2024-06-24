"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { FormEvent } from "react";
import { forwardRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateWishMutation } from "../../hooks/mutations/wishes/update";
import type { OwnWish } from "../../server/database/types/wishes";
import { mergeRefs } from "../../utils/refs";
import { useClientTranslations } from "../../utils/translations/client";
import { DeleteWishButton } from "../delete-wish-button";
import { Modal } from "../modal";
import { WishDescriptionFormInput } from "../wish-description-form-input";
import { WishLinkFormInput } from "../wish-link-form-input";
import { Description } from "../wish-modal/description";
import { Link } from "../wish-modal/link";
import { Title } from "../wish-modal/title";
import { FormSchema } from "./form-schema";

type Props = { wish: OwnWish };

export const OwnWishModal = forwardRef<HTMLDialogElement, Props>(function OwnWishModal(props, ref) {
	const t = useClientTranslations("client.OwnWishModal");

	const innerRef = useRef<HTMLDialogElement>(null);
	const deleteWishButtonRef = useRef<{ reset: () => void }>(null);

	const [updating, setUpdating] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			description: props.wish.description,
			link: props.wish.link,
		},
	});

	function cancelDeleting() {
		deleteWishButtonRef.current?.reset();
	}

	function startUpdating() {
		cancelDeleting();
		setUpdating(true);
	}

	function cancelUpdating() {
		setUpdating(false);
		reset();
	}

	function closeModal() {
		innerRef.current?.close();
		setTimeout(cancelUpdating, 200);
		setTimeout(cancelDeleting, 200);
	}

	const updateWish = useUpdateWishMutation({
		onSuccess() {
			setUpdating(false);
		},
	});

	function submit(event: FormEvent<HTMLFormElement>) {
		handleSubmit((data) => {
			updateWish.mutate({ id: props.wish.id, ...data });
		})(event);
	}

	return (
		<Modal close={closeModal} ref={mergeRefs(ref, innerRef)}>
			<form className="flex flex-col gap-2" onSubmit={submit}>
				<Title title={props.wish.title} />
				{updating ? (
					<WishDescriptionFormInput error={errors.description} register={register("description")} />
				) : (
					<Description description={props.wish.description} />
				)}
				{updating ? (
					<WishLinkFormInput error={errors.link} register={register("link")} />
				) : (
					<Link link={props.wish.link} />
				)}
				{updating ? (
					<div className="modal-action">
						<button className="btn" onClick={cancelUpdating} type="button">
							{t("cancelButtonText")}
						</button>
						<button className="btn btn-primary" disabled={updateWish.isPending} type="submit">
							{updateWish.isPending && <span className="loading loading-spinner" />}
							{t("updateButtonText")}
						</button>
					</div>
				) : (
					<div className="modal-action">
						<button className="btn" onClick={startUpdating} type="button">
							{t("updateButtonText")}
						</button>
						<DeleteWishButton ref={deleteWishButtonRef} wishId={props.wish.id} />
					</div>
				)}
			</form>
		</Modal>
	);
});
