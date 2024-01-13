"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { FormEvent } from "react";
import { forwardRef, useRef } from "react";
import { useForm } from "react-hook-form";
import { useCreateWishMutation } from "../../hooks/mutations/wishes/create";
import { mergeRefs } from "../../utils/refs";
import { useClientTranslations } from "../../utils/translations/client";
import Modal from "../Modal";
import WishDescriptionFormInput from "../WishDescriptionFormInput";
import WishLinkFormInput from "../WishLinkFormInput";
import WishTitleFormInput from "../WishTitleFormInput";
import { FormSchema } from "./formSchema";

export default forwardRef<HTMLDialogElement>(function NewWishModal(_props, ref) {
  const t = useClientTranslations("client.NewWishModal");

  const innerRef = useRef<HTMLDialogElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchema>({ resolver: zodResolver(FormSchema) });

  function closeModal() {
    innerRef.current?.close();
    setTimeout(reset, 200);
  }

  const createWish = useCreateWishMutation({ onSuccess: closeModal });

  function submit(event: FormEvent<HTMLFormElement>) {
    void handleSubmit(function (data) {
      createWish.mutate(data);
    })(event);
  }

  return (
    <Modal close={closeModal} ref={mergeRefs(ref, innerRef)}>
      <form className="flex flex-col gap-2" onSubmit={submit}>
        <WishTitleFormInput error={errors.title} register={register("title")} />
        <WishDescriptionFormInput error={errors.description} register={register("description")} />
        <WishLinkFormInput error={errors.link} register={register("link")} />
        <div className="modal-action">
          <button className="btn" onClick={closeModal} type="button">
            {t("cancelButtonText")}
          </button>
          <button className="btn btn-primary" disabled={createWish.isPending} type="submit">
            {createWish.isPending && <span className="loading loading-spinner" />}
            {t("createButtonText")}
          </button>
        </div>
      </form>
    </Modal>
  );
});
