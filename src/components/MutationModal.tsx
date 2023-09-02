"use client";

import type { ForwardedRef } from "react";
import { forwardRef } from "react";
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
): JSX.Element {
  return (
    <Modal ref={ref}>
      <h3 className="text-lg font-bold">{props.title}</h3>
      <p className="py-4">{props.body}</p>
      <div className="modal-action">
        <button className="btn btn-ghost" type="submit">
          Cancel
        </button>
        <MutationButton mutation={props.mutation} type="submit" variables={props.variables}>
          OK
        </MutationButton>
      </div>
    </Modal>
  );
});
