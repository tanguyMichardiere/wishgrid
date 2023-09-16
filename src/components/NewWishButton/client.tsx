"use client";

import { useRef } from "react";
import NewWishModal from "../NewWishModal";
import type { ContentProps } from "./content";

type ClientProps = ContentProps & {
  text: string;
};

export default function NewWishButtonClient(props: ClientProps): JSX.Element {
  const modalRef = useRef<HTMLDialogElement>(null);

  function showModal() {
    modalRef.current?.showModal();
  }

  return (
    <>
      <button className="btn mx-2 justify-center" onClick={showModal} type="button">
        {props.text}
      </button>
      <NewWishModal initialCurrentUser={props.initialCurrentUser} ref={modalRef} />
    </>
  );
}
