"use client";

import { useCallback, useRef } from "react";
import ActionModal from "../../../components/ActionModal";
import { deleteCurrentUser } from "../../../server/actions/users";

export default function DeleteCurrentUserButton(): JSX.Element {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleDeleteAccount = useCallback(function () {
    modalRef.current?.showModal();
  }, []);

  return (
    <>
      <button className="btn btn-error" onClick={handleDeleteAccount} type="button">
        Delete account
      </button>
      <ActionModal
        action={deleteCurrentUser}
        body="This will also delete all your wishes and comments, and remove you from anyone's friend list."
        ref={modalRef}
        title="Delete Account?"
      />
    </>
  );
}
