"use client";

import "client-only";
import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { useClientTranslations } from "../utils/translations/client";
import Modal from "./Modal";
import type { Props as ButtonProps } from "./MutationButton";
import MutationButton from "./MutationButton";

type Props<TVariables> = {
  title: string;
  body: string;
} & Pick<ButtonProps<TVariables>, "mutation" | "variables">;

export default forwardRef(function MutationModal<TVariables>(
  props: Props<TVariables>,
  ref: ForwardedRef<HTMLDialogElement>,
) {
  const t = useClientTranslations("client.MutationModal");

  return (
    <Modal ref={ref}>
      <h3 className="text-lg font-bold">{props.title}</h3>
      <p className="py-4">{props.body}</p>
      <form className="modal-action" method="dialog">
        <button className="btn btn-ghost" type="submit">
          {t("cancel")}
        </button>
        <MutationButton mutation={props.mutation} type="submit" variables={props.variables}>
          {t("ok")}
        </MutationButton>
      </form>
    </Modal>
  );
});
