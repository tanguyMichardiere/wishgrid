"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classix";
import { useLogger } from "next-axiom";
import { useTranslations } from "next-intl";
import type { FormEvent } from "react";
import { forwardRef, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCurrentUser } from "../context/currentUser/hook";
import { WishDescription, WishLink, WishTitle } from "../server/db/types/wishes";
import { mergeRefs } from "../utils/mergeRefs";
import { trpc } from "../utils/trpc/client";
import Modal from "./Modal";

const FormSchema = z.object({
  title: WishTitle,
  description: WishDescription,
  link: z.preprocess(
    (arg) =>
      typeof arg === "string" &&
      arg.length > 0 &&
      !arg.startsWith("http://") &&
      !arg.startsWith("https://")
        ? `https://${arg}`
        : arg,
    WishLink,
  ),
});

export default forwardRef<HTMLDialogElement>(function NewWishModal(_props, ref): JSX.Element {
  const t = useTranslations("clientComponents.NewWishModal");

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

  const trpcContext = trpc.useContext();

  const currentUser = useCurrentUser();

  const createWish = trpc.wishes.create.useMutation({
    // no optimistic update because we don't know the ID yet
    onSuccess(id, { title, description, link }) {
      trpcContext.wishes.listOwn.setData(undefined, (wishes) =>
        wishes !== undefined
          ? [
              ...wishes,
              { id, title, description, link, userId: currentUser.id, reservedById: null },
            ].toSorted((a, b) => a.title.localeCompare(b.title))
          : undefined,
      );
      closeModal();
    },
    async onSettled() {
      await trpcContext.wishes.listOwn.invalidate();
    },
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    handleSubmit(function (data) {
      createWish.mutate(data);
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
          <p className="text-sm">{errors.title?.message}</p>
        </div>
        <div className="flex flex-col self-center">
          <textarea
            {...register("description")}
            className={cx(
              "input input-bordered h-auto w-72",
              errors.description !== undefined && "outline outline-error",
            )}
            placeholder={t("descriptionInputPlaceholder")}
            rows={5}
          />
          <p className="text-sm">{errors.description?.message}</p>
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
          <p className="text-sm">{errors.link?.message}</p>
        </div>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={closeModal} type="button">
            {t("cancelButtonText")}
          </button>
          <button
            className={cx("btn", createWish.isLoading && "btn-disabled loading")}
            disabled={createWish.isLoading}
            type="submit"
          >
            {t("createButtonText")}
          </button>
        </div>
      </form>
    </Modal>
  );
});
