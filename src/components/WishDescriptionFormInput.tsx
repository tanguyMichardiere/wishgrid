import cx from "classix";
import "client-only";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useClientTranslations } from "../utils/translations/client";

type Props = {
  register: UseFormRegisterReturn<"description">;
  error?: FieldError;
};

export default function WishDescriptionFormInput(props: Props): JSX.Element {
  const t = useClientTranslations("client.WishDescriptionFormInput");

  return (
    <div className="form-control self-center">
      <textarea
        {...props.register}
        className={cx(
          "textarea textarea-bordered w-72",
          props.error !== undefined && "outline outline-error",
        )}
        placeholder={t("placeholder")}
        rows={5}
      />
      <label className="label">
        <span className="label-text-alt">
          {props.error?.type === "too_big" ? t("tooBig", { length: 512 }) : props.error?.message}
        </span>
      </label>
    </div>
  );
}
