"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { cx } from "classix";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import { useClientTranslations } from "../utils/translations/client";

type Props = {
  className?: string;
  children: ReactNode;
  close?: () => void;
};

export default forwardRef<HTMLDialogElement, Props>(function Modal(props, ref) {
  const t = useClientTranslations("client.Modal");

  return (
    <dialog className="modal modal-bottom sm:modal-middle" ref={ref}>
      <div className={cx("modal-box pt-12", props.className)}>
        {props.close !== undefined ? (
          <button
            aria-label={t("closeButtonText")}
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            onClick={props.close}
            type="button"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        ) : (
          <form method="dialog">
            <button
              aria-label={t("closeButtonText")}
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
              type="submit"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </form>
        )}
        {props.children}
      </div>
      {props.close !== undefined ? (
        <div className="modal-backdrop">
          <button className="cursor-default" onClick={props.close} type="button">
            {t("closeButtonText")}
          </button>
        </div>
      ) : (
        <form className="modal-backdrop" method="dialog">
          <button className="cursor-default" type="submit">
            {t("closeButtonText")}
          </button>
        </form>
      )}
    </dialog>
  );
});
