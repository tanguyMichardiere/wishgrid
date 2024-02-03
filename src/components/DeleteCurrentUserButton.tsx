"use client";

import type { JSX } from "react";
import { useRef } from "react";
import { useDeleteCurrentUserMutation } from "../hooks/mutations/users/deleteCurrent";
import { useClientTranslations } from "../utils/translations/client";
import MutationModal from "./MutationModal";

export default function DeleteCurrentUserButton(): JSX.Element {
  const t = useClientTranslations("client.DeleteCurrentUserButton");

  const modalRef = useRef<HTMLDialogElement>(null);

  function showModal() {
    modalRef.current?.showModal();
  }

  const deleteCurrentUser = useDeleteCurrentUserMutation();

  return (
    <>
      <button className="btn btn-error" onClick={showModal} type="button">
        {t("text")}
      </button>
      <MutationModal
        body={t("modalBody")}
        mutation={deleteCurrentUser}
        ref={modalRef}
        title={t("modalTitle")}
        variables={undefined}
      />
    </>
  );
}
