"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classix";
import { useLogger } from "next-axiom";
import type { FormEvent } from "react";
import { forwardRef, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { User } from "../server/db/types/user";
import { WishDescription, WishLink, WishTitle } from "../server/db/types/wishes";
import { mergeRefs } from "../utils/mergeRefs";
import { trpc } from "../utils/trpc/client";
import Modal from "./Modal";

const FormSchema = z.object({
  title: WishTitle,
  description: WishDescription,
  link: WishLink,
});

type Props = {
  initialCurrentUser: User;
};

export default forwardRef<HTMLDialogElement, Props>(function NewWishModal(props, ref): JSX.Element {
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

  const currentUser = trpc.users.getCurrent.useQuery(undefined, {
    initialData: props.initialCurrentUser,
  });

  const createWish = trpc.wishes.create.useMutation({
    // no optimistic update because we don't know the ID yet
    onSuccess(id, { title, description, link }) {
      trpcContext.wishes.listOwn.setData(undefined, (wishes) =>
        wishes !== undefined
          ? [
              ...wishes,
              { id, title, description, link, userId: currentUser.data.id, reservedById: null },
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
            className={cx("input w-72", errors.title !== undefined && "outline outline-error")}
            {...register("title")}
            placeholder="Title"
          />
          <p className="text-sm">{errors.title?.message}</p>
        </div>
        <div className="flex flex-col self-center">
          <textarea
            {...register("description")}
            className={cx(
              "input h-auto w-72",
              errors.description !== undefined && "outline outline-error",
            )}
            placeholder="Description"
            rows={5}
          />
          <p className="text-sm">{errors.description?.message}</p>
        </div>
        <div className="flex flex-col self-center">
          <input
            className={cx("input w-72", errors.link !== undefined && "outline outline-error")}
            {...register("link")}
            placeholder="Link"
          />
          <p className="text-sm">{errors.link?.message}</p>
        </div>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={closeModal} type="button">
            Cancel
          </button>
          <button
            className={cx("btn", createWish.isLoading && "btn-disabled loading")}
            disabled={createWish.isLoading}
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
});
