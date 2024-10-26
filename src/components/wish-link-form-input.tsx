import cx from "classix";
import "client-only";
import { type JSX, useMemo } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useClientTranslations } from "../utils/translations/client";

type Props = {
	register: UseFormRegisterReturn<"link">;
	error?: FieldError;
};

export function WishLinkFormInput(props: Props): JSX.Element {
	const t = useClientTranslations("client.WishLinkFormInput");

	const errorMessage = useMemo(() => {
		if (props.error?.type === "invalid_string") {
			return t("invalid");
		}
		if (props.error?.type === "too_big") {
			return t("tooBig", { length: 512 });
		}
		return props.error?.message;
	}, [props.error, t]);

	return (
		<label className="form-control self-center">
			<input
				{...props.register}
				className={cx(
					"input input-bordered w-72",
					props.error !== undefined && "outline outline-error",
				)}
				placeholder={t("placeholder")}
			/>
			<div className="label">
				<span className="label-text-alt">{errorMessage}</span>
			</div>
		</label>
	);
}
