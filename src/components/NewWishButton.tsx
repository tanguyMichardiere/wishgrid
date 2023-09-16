"use client";

import { useRef } from "react";
import type { User } from "../server/db/types/user";
import NewWishModal from "./NewWishModal";

type Props = {
  initialCurrentUser: User;
};

export default function NewWishButton(props: Props): JSX.Element {
  const modalRef = useRef<HTMLDialogElement>(null);

  function showModal() {
    modalRef.current?.showModal();
  }

  return (
    <>
      <button className="btn mx-2 justify-center" onClick={showModal} type="button">
        New Wish
      </button>
      <NewWishModal initialCurrentUser={props.initialCurrentUser} ref={modalRef} />
    </>
  );
}
