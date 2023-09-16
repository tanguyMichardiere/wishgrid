import { forwardRef } from "react";
import type { OwnWish } from "../server/db/types/wishes";
import DeleteWishButton from "./DeleteWishButton";
import Modal from "./Modal";

type Props = {
  wish: OwnWish;
};

export default forwardRef<HTMLDialogElement, Props>(function OwnWishModal(props, ref) {
  return (
    <Modal className="flex flex-col items-center gap-4" ref={ref}>
      <h1 className="text-xl">{props.wish.title}</h1>
      {props.wish.description.length > 0 && <p className="break-words">{props.wish.description}</p>}
      {props.wish.link.length > 0 && (
        <a className="link break-all" href={props.wish.link} rel="noreferrer" target="_blank">
          {props.wish.link}
        </a>
      )}
      <div className="modal-action">
        <DeleteWishButton wishId={props.wish.id} />
      </div>
    </Modal>
  );
});
