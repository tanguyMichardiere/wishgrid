import { cx } from "classix";
import type { ReactNode } from "react";
import { forwardRef } from "react";

type Props = {
  className?: string;
  children: ReactNode;
  onBackdropClick?: () => void;
};

export default forwardRef<HTMLDialogElement, Props>(function Modal(props, ref): JSX.Element {
  return (
    <dialog className="modal" ref={ref}>
      <div className={cx("modal-box", props.className)}>{props.children}</div>
      {props.onBackdropClick !== undefined ? (
        <div className="modal-backdrop">
          <button className="cursor-default" onClick={props.onBackdropClick} type="button">
            close
          </button>
        </div>
      ) : (
        <form className="modal-backdrop" method="dialog">
          <button className="cursor-default" type="submit">
            close
          </button>
        </form>
      )}
    </dialog>
  );
});
