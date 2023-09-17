"use client";

import { useRef } from "react";
import type { Wish } from "../server/db/types/wishes";
import Card from "./Card";
import WishModal from "./WishModal";

type Props = {
  userId: string;
  wish: Wish;
};

export default function WishPreviewCard(props: Props): JSX.Element {
  const modalRef = useRef<HTMLDialogElement>(null);

  function showModal() {
    modalRef.current?.showModal();
  }

  return (
    <>
      <button className="w-full" onClick={showModal} type="button">
        <Card className="justify-between">
          <div>{props.wish.title}</div>
          <div className="flex items-center gap-2">
            <span className="badge">{props.wish.comments.length}</span>
            <input
              checked={props.wish.reservedBy !== null}
              className="checkbox"
              readOnly
              type="checkbox"
            />
          </div>
        </Card>
      </button>
      <WishModal ref={modalRef} userId={props.userId} wish={props.wish} />
    </>
  );
}
