"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import { trpc } from "../utils/trpc/client";
import MutationModal from "./MutationModal";

export default function DeleteCurrentUserButton(): JSX.Element {
  const router = useRouter();

  const deleteCurrentUser = trpc.users.deleteCurrent.useMutation({
    onSettled() {
      router.replace("/sign-in/");
    },
  });

  const modalRef = useRef<HTMLDialogElement>(null);

  const handleDeleteAccount = useCallback(function () {
    modalRef.current?.showModal();
  }, []);

  return (
    <>
      <button className="btn btn-error" onClick={handleDeleteAccount} type="button">
        Delete account
      </button>
      <MutationModal
        body="This will also delete all your wishes and comments, and remove you from anyone's friend list."
        mutation={deleteCurrentUser}
        ref={modalRef}
        title="Delete Account?"
        variables={undefined}
      />
    </>
  );
}
