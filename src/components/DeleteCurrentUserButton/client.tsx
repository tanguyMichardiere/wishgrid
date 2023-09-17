"use client";

import { useRouter } from "next-intl/client";
import { useRef } from "react";
import { trpc } from "../../utils/trpc/client";
import MutationModal from "../MutationModal";
import type { ClientProps } from "./props";

export default function DeleteCurrentUserButtonClient(props: ClientProps): JSX.Element {
  const router = useRouter();

  const deleteCurrentUser = trpc.users.deleteCurrent.useMutation({
    onSettled() {
      router.replace("/sign-in");
    },
  });

  const modalRef = useRef<HTMLDialogElement>(null);

  function showModal() {
    modalRef.current?.showModal();
  }

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
