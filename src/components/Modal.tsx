"use client";

import { cx } from "classix";
import type { ReactNode } from "react";
import { forwardRef } from "react";

type Props = {
  modalBoxClassName?: string;
  children: ReactNode;
};

export default forwardRef<HTMLDialogElement, Props>(function Modal(props, ref): JSX.Element {
  return (
    <dialog className="modal" ref={ref}>
      <form className={cx("modal-box", props.modalBoxClassName)} method="dialog">
        {props.children}
      </form>
      <form className="modal-backdrop" method="dialog">
        <button className="cursor-default" type="submit">
          close
        </button>
      </form>
    </dialog>
  );
});
