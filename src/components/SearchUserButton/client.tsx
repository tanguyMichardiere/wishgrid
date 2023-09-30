"use client";

import { useRef } from "react";
import SearchUserModal from "../SearchUserModal";

type Props = {
  text: string;
};

export default function SearchUserButtonClient(props: Props): JSX.Element {
  const modalRef = useRef<HTMLDialogElement>(null);

  function showModal() {
    modalRef.current?.showModal();
  }

  return (
    <>
      <button className="btn mx-2 justify-center" onClick={showModal} type="button">
        {props.text}
      </button>
      <SearchUserModal ref={modalRef} />
    </>
  );
}
