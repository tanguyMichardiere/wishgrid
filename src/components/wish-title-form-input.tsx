import cx from "classix";
import "client-only";
import { type JSX, useMemo } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useClientTranslations } from "../utils/translations/client";

type Props = {
	register: UseFormRegisterReturn<"title">;
	error?: FieldError;
};

export function WishTitleFormInput(props: Props): JSX.Element {
	const t = useClientTranslations("client.WishTitleFormInput");

	const errorMessage = useMemo(() => {
		if (props.error?.type === "too_small") {
			return t("tooSmall", { length: 4 });
		}
		if (props.error?.type === "too_big") {
			return t("tooBig", { length: 32 });
		}
		return props.error?.message;
	}, [props.error, t]);

	return (
		<fieldset className="fieldset self-center">
			<input
				{...props.register}
				className={cx(
					"input input-bordered w-72",
					props.error !== undefined && "outline outline-error",
				)}
				placeholder={t("placeholder")}
			/>
			<p className="fieldset-label">{errorMessage}</p>
		</fieldset>
	);
}
