"use client";

import { useRef } from "react";
import type { OwnWish } from "../server/db/types/wishes";
import Card from "./Card";
import OwnWishModal from "./OwnWishModal";

type Props = {
  wish: OwnWish;
};

export default function OwnWishPreviewCard(props: Props): JSX.Element {
  const modalRef = useRef<HTMLDialogElement>(null);

  function showModal() {
    modalRef.current?.showModal();
  }

  return (
    <>
      <button className="w-full" onClick={showModal} type="button">
        <Card>
          <div>{props.wish.title}</div>
        </Card>
      </button>
      <OwnWishModal ref={modalRef} wish={props.wish} />
    </>
  );
}
