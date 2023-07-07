"use client";

import { forwardRef } from "react";
import Modal from "./Modal";

type Props = {
  title: string;
  body: string;
  action: () => Promise<void>;
};

export default forwardRef<HTMLDialogElement, Props>(function ActionModal(props, ref): JSX.Element {
  return (
    <Modal ref={ref}>
      <h3 className="text-lg font-bold">{props.title}</h3>
      <p className="py-4">{props.body}</p>
      <div className="modal-action">
        <button className="btn-ghost btn" type="submit">
          Cancel
        </button>
        <button className="btn" formAction={props.action} type="submit">
          OK
        </button>
      </div>
    </Modal>
  );
});
