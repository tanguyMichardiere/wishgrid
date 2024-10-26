"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classix";
import { type FormEvent, type JSX, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useCurrentUser } from "../../../../context/current-user/hook";
import { useUpdateUserMutation } from "../../../../hooks/mutations/users/update";
import { useRouter } from "../../../../i18n/routing";
import { getBase64 } from "../../../../utils/base64";
import { useClientTranslations } from "../../../../utils/translations/client";
import { FormSchema } from "./form-schema";

export function UpdateUser(): JSX.Element {
	const router = useRouter();
	const t = useClientTranslations("client.UpdateUser");

	const currentUser = useCurrentUser();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: { name: currentUser.name },
	});

	const updateUser = useUpdateUserMutation({ onSuccess: router.refresh.bind(router) });

	function submit(event: FormEvent<HTMLFormElement>) {
		handleSubmit(async (data) => {
			if (data.image !== undefined) {
				updateUser.mutate({
					name: data.name,
					image: await getBase64(data.image),
				});
			} else {
				updateUser.mutate({ name: data.name });
			}
		})(event);
	}

	const errorMessage = useMemo(() => {
		if (errors.name?.type === "too_small") {
			return t("nameTooSmall", { length: 2 });
		}
		if (errors.name?.type === "too_big") {
			return t("nameTooBig", { length: 32 });
		}
		return errors.name?.message;
	}, [errors.name, t]);

	return (
		<form className="flex flex-col gap-2" onSubmit={submit}>
			<label className="form-control">
				<div className="label">
					<span className="label-text">{t("imageLabel")}</span>
				</div>
				<input
					{...register("image", { required: false })}
					accept="image/*"
					className="file-input w-72"
					type="file"
				/>
			</label>
			<label className="form-control">
				<div className="label">
					<span className="label-text">{t("nameLabel")}</span>
				</div>
				<input
					{...register("name")}
					className={cx(
						"input input-bordered w-72",
						errors.name !== undefined && "outline outline-error",
					)}
					placeholder={t("namePlaceholder")}
				/>
				<div className="label">
					<span className="label-text-alt">{errorMessage}</span>
				</div>
			</label>
			<button className="btn btn-primary" disabled={updateUser.isPending} type="submit">
				{updateUser.isPending && <span className="loading loading-spinner" />}
				{t("submitButtonText")}
			</button>
		</form>
	);
}
