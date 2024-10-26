"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classix";
import type { FormEvent } from "react";
import { forwardRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useCreateCommentMutation } from "../../../hooks/mutations/comments/create";
import { setRef } from "../../../utils/refs";
import { useClientTranslations } from "../../../utils/translations/client";
import { FormSchema } from "./form-schema";

type Props = {
	userId: string;
	wishId: string;
};

export const CommentInput = forwardRef<{ reset: () => void }, Props>(
	function CommentInput(props, ref) {
		const t = useClientTranslations("client.CommentInput");

		const {
			register,
			handleSubmit,
			formState: { errors },
			reset,
		} = useForm<FormSchema>({ resolver: zodResolver(FormSchema) });

		setRef(ref, { reset });

		const createComment = useCreateCommentMutation(props.userId, { onSuccess: reset });

		function submit(event: FormEvent<HTMLFormElement>) {
			handleSubmit((data) => {
				createComment.mutate({
					...data,
					wishId: props.wishId,
				});
			})(event);
		}

		const errorMessage = useMemo(() => {
			if (errors.text?.type === "too_small") {
				return t("textTooSmall", { length: 4 });
			}
			if (errors.text?.type === "too_big") {
				return t("textTooBig", { length: 256 });
			}
			return errors.text?.message;
		}, [errors.text, t]);

		return (
			<form onSubmit={submit}>
				<div className="flex items-center gap-2">
					<input
						{...register("text")}
						className={cx(
							"input input-bordered min-w-0 grow",
							errors.text !== undefined && "outline outline-error",
						)}
						placeholder={t("placeholder")}
					/>
					<button className="btn btn-square btn-primary" type="submit">
						<PaperAirplaneIcon className="h-6 w-6" />
					</button>
				</div>
				<p className="text-sm">{errorMessage}</p>
			</form>
		);
	},
);
