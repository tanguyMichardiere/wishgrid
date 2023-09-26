"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classix";
import { useLogger } from "next-axiom";
import type { FormEvent } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useCreateCommentMutation } from "../../../hooks/mutations/comments/create";
import { useClientTranslations } from "../../../utils/translations/client";
import { FormSchema } from "./formSchema";

type Props = {
  userId: string;
  wishId: string;
};

export default function CommentInput(props: Props): JSX.Element {
  const t = useClientTranslations("clientComponents.CommentInput");
  const log = useLogger();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof FormSchema>>({ resolver: zodResolver(FormSchema) });

  const createComment = useCreateCommentMutation(props.userId);

  function submit(event: FormEvent<HTMLFormElement>) {
    handleSubmit(function (data) {
      createComment.mutate({ ...data, wishId: props.wishId });
      reset();
    })(event).catch(log.error);
  }

  return (
    <form onSubmit={submit}>
      <div className="flex items-center gap-2">
        <input
          {...register("text")}
          className={cx(
            "input input-bordered grow",
            errors.text !== undefined && "outline outline-error",
          )}
          placeholder={t("placeholder")}
        />
        <button className="btn btn-square btn-primary" type="submit">
          <PaperAirplaneIcon className="h-6 w-6" />
        </button>
      </div>
      <p className="text-sm">
        {errors.text?.type === "too_small"
          ? t("textTooSmall", { length: 4 })
          : errors.text?.type === "too_big"
          ? t("textTooBig", { length: 256 })
          : errors.text?.message}
      </p>
    </form>
  );
}
