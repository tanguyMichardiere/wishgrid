"use client";

import { useRef } from "react";
import { useDeleteCurrentUserMutation } from "../../hooks/mutations/users/deleteCurrent";
import MutationModal from "../MutationModal";

type Props = {
  text: string;
  modalBody: string;
  modalTitle: string;
};

export default function DeleteCurrentUserButtonClient(props: Props): JSX.Element {
  const modalRef = useRef<HTMLDialogElement>(null);

  function showModal() {
    modalRef.current?.showModal();
  }

  const deleteCurrentUser = useDeleteCurrentUserMutation()

  return (
    <>
      <button className="btn btn-error" onClick={showModal} type="button">
        {props.text}
      </button>
      <MutationModal
        body={props.modalBody}
        mutation={deleteCurrentUser}
        ref={modalRef}
        title={props.modalTitle}
        variables={undefined}
      />
    </>
  );
}
