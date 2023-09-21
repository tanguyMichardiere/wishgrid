"use client";

import { cx } from "classix";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import { useClientTranslations } from "../utils/translations/client";

type Props = {
  className?: string;
  children: ReactNode;
  onBackdropClick?: () => void;
};

export default forwardRef<HTMLDialogElement, Props>(function Modal(props, ref): JSX.Element {
  const t = useClientTranslations("clientComponents.Modal");

  return (
    <dialog className="modal" ref={ref}>
      <div className={cx("modal-box", props.className)}>{props.children}</div>
      {props.onBackdropClick !== undefined ? (
        <div className="modal-backdrop">
          <button className="cursor-default" onClick={props.onBackdropClick} type="button">
            {t("backdropButtonText")}
          </button>
        </div>
      ) : (
        <form className="modal-backdrop" method="dialog">
          <button className="cursor-default" type="submit">
            {t("backdropButtonText")}
          </button>
        </form>
      )}
    </dialog>
  );
});
