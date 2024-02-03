import cx from "classix";
import "client-only";
import type { JSX } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useClientTranslations } from "../utils/translations/client";

type Props = {
  register: UseFormRegisterReturn<"link">;
  error?: FieldError;
};

export default function WishLinkFormInput(props: Props): JSX.Element {
  const t = useClientTranslations("client.WishLinkFormInput");

  return (
    <div className="form-control self-center">
      <input
        {...props.register}
        className={cx(
          "input input-bordered w-72",
          props.error !== undefined && "outline outline-error",
        )}
        placeholder={t("placeholder")}
      />
      <label className="label">
        <span className="label-text-alt">
          {props.error?.type === "invalid_string"
            ? t("invalid")
            : props.error?.type === "too_big"
              ? t("tooBig", { length: 512 })
              : props.error?.message}
        </span>
      </label>
    </div>
  );
}
