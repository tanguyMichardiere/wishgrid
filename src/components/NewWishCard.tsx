"use client";

import { useRef } from "react";
import type { User } from "../server/db/types/user";
import Card from "./Card";
import NewWishModal from "./NewWishModal";

type Props = {
  initialCurrentUser: User;
};

export default function NewWishCard(props: Props): JSX.Element {
  const modalRef = useRef<HTMLDialogElement>(null);

  function showModal() {
    modalRef.current?.showModal();
  }

  return (
    <>
      <button onClick={showModal}>
        <Card className="justify-center">New Wish</Card>
      </button>
      <NewWishModal initialCurrentUser={props.initialCurrentUser} ref={modalRef} />
    </>
  );
}
