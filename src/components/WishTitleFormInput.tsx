import cx from "classix";
import "client-only";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useClientTranslations } from "../utils/translations/client";

type Props = {
  register: UseFormRegisterReturn<"title">;
  error?: FieldError;
};

export default function WishTitleFormInput(props: Props): JSX.Element {
  const t = useClientTranslations("client.WishTitleFormInput");

  return (
    <div className="flex flex-col self-center">
      <input
        {...props.register}
        className={cx(
          "input input-bordered w-72",
          props.error !== undefined && "outline outline-error",
        )}
        placeholder={t("placeholder")}
      />
      <p className="text-sm">
        {props.error?.type === "too_small"
          ? t("tooShort", { length: 4 })
          : props.error?.type === "too_big"
            ? t("tooBig", { length: 32 })
            : props.error?.message}
      </p>
    </div>
  );
}
