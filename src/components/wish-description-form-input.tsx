import cx from "classix";
import "client-only";
import type { JSX } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useClientTranslations } from "../utils/translations/client";

type Props = {
	register: UseFormRegisterReturn<"description">;
	error?: FieldError;
};

export function WishDescriptionFormInput(props: Props): JSX.Element {
	const t = useClientTranslations("client.WishDescriptionFormInput");

	return (
		<label className="form-control self-center">
			<textarea
				{...props.register}
				className={cx(
					"textarea textarea-bordered w-72",
					props.error !== undefined && "outline outline-error",
				)}
				placeholder={t("placeholder")}
				rows={5}
			/>
			<div className="label">
				<span className="label-text-alt">
					{props.error?.type === "too_big" ? t("tooBig", { length: 512 }) : props.error?.message}
				</span>
			</div>
		</label>
	);
}
