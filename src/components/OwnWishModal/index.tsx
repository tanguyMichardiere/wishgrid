"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLogger } from "next-axiom";
import type { FormEvent } from "react";
import { forwardRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateWishMutation } from "../../hooks/mutations/wishes/update";
import { type OwnWish } from "../../server/db/types/wishes";
import { mergeRefs } from "../../utils/refs";
import { useClientTranslations } from "../../utils/translations/client";
import DeleteWishButton from "../DeleteWishButton";
import Modal from "../Modal";
import WishDescriptionFormInput from "../WishDescriptionFormInput";
import WishLinkFormInput from "../WishLinkFormInput";
import { FormSchema } from "./formSchema";

type Props = {
  wish: OwnWish;
};

export default forwardRef<HTMLDialogElement, Props>(function OwnWishModal(props, ref) {
  const t = useClientTranslations("clientComponents.OwnWishModal");
  const log = useLogger();

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
    defaultValues: { description: props.wish.description, link: props.wish.link },
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

  const updateWish = useUpdateWishMutation();

  function submit(event: FormEvent<HTMLFormElement>) {
    handleSubmit(function (data) {
      updateWish.mutate({ id: props.wish.id, ...data });
      setUpdating(false);
    })(event).catch(log.error);
  }

  return (
    <Modal close={closeModal} ref={mergeRefs(ref, innerRef)}>
      <form className="flex flex-col gap-2" onSubmit={submit}>
        <h2 className="text-center text-xl">{props.wish.title}</h2>
        {updating ? (
          <WishDescriptionFormInput error={errors.description} register={register("description")} />
        ) : (
          props.wish.description.length > 0 && (
            <p className="break-words">{props.wish.description}</p>
          )
        )}
        {updating ? (
          <WishLinkFormInput error={errors.link} register={register("link")} />
        ) : (
          props.wish.link.length > 0 && (
            <a className="link break-all" href={props.wish.link} rel="noreferrer" target="_blank">
              {props.wish.link}
            </a>
          )
        )}
        {updating ? (
          <div className="modal-action">
            <button className="btn" onClick={cancelUpdating} type="button">
              {t("cancelButtonText")}
            </button>
            <button className="btn btn-primary" disabled={updateWish.isLoading} type="submit">
              {updateWish.isLoading && <span className="loading loading-spinner" />}
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
