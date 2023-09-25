"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classix";
import { useLogger } from "next-axiom";
import type { FormEvent } from "react";
import { forwardRef, useRef } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useCreateWishMutation } from "../../hooks/mutations/wishes/create";
import { mergeRefs } from "../../utils/mergeRefs";
import { useClientTranslations } from "../../utils/translations/client";
import Modal from "../Modal";
import { FormSchema } from "./formSchema";

export default forwardRef<HTMLDialogElement>(function NewWishModal(_props, ref): JSX.Element {
  const t = useClientTranslations("clientComponents.NewWishModal");
  const log = useLogger();

  const innerRef = useRef<HTMLDialogElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof FormSchema>>({ resolver: zodResolver(FormSchema) });

  function closeModal() {
    innerRef.current?.close();
    reset();
  }

  const createWish = useCreateWishMutation();

  function submit(event: FormEvent<HTMLFormElement>) {
    handleSubmit(async function (data) {
      await createWish.mutateAsync(data);
      closeModal();
    })(event).catch(log.error);
  }

  return (
    <Modal onBackdropClick={closeModal} ref={mergeRefs(ref, innerRef)}>
      <form className="flex flex-col gap-2" onSubmit={submit}>
        <div className="flex flex-col self-center">
          <input
            {...register("title")}
            className={cx(
              "input input-bordered w-72",
              errors.title !== undefined && "outline outline-error",
            )}
            placeholder={t("titleInputPlaceholder")}
          />
          <p className="text-sm">
            {errors.title?.type === "too_small"
              ? t("titleTooShort", { length: 4 })
              : errors.title?.type === "too_big"
              ? t("titleTooBig", { length: 32 })
              : errors.title?.message}
          </p>
        </div>
        <div className="flex flex-col self-center">
          <textarea
            {...register("description")}
            className={cx(
              "textarea textarea-bordered w-72",
              errors.description !== undefined && "outline outline-error",
            )}
            placeholder={t("descriptionInputPlaceholder")}
            rows={5}
          />
          <p className="text-sm">
            {errors.description?.type === "too_big"
              ? t("descriptionTooBig", { length: 512 })
              : errors.description?.message}
          </p>
        </div>
        <div className="flex flex-col self-center">
          <input
            {...register("link")}
            className={cx(
              "input input-bordered w-72",
              errors.link !== undefined && "outline outline-error",
            )}
            placeholder={t("linkInputPlaceholder")}
          />
          <p className="text-sm">
            {errors.link?.type === "invalid_string"
              ? t("invalidUrl")
              : errors.link?.type === "too_big"
              ? t("linkTooBig", { length: 512 })
              : errors.link?.message}
          </p>
        </div>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={closeModal} type="button">
            {t("cancelButtonText")}
          </button>
          <button className="btn" disabled={createWish.isLoading} type="submit">
            {createWish.isLoading && <span className="loading loading-spinner" />}
            {t("createButtonText")}
          </button>
        </div>
      </form>
    </Modal>
  );
});
