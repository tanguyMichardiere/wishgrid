import { forwardRef } from "react";
import type { Wish } from "../../server/db/types/wishes";
import Modal from "../Modal";
import ReserveWishButton from "../ReserveWishButton";
import CommentInput from "./CommentInput";
import Comments from "./Comments";
import ReservedBy from "./ReservedBy";

type Props = {
  userId: string;
  wish: Wish;
};

export default forwardRef<HTMLDialogElement, Props>(function WishModal(props, ref) {
  return (
    <Modal className="flex flex-col items-center gap-4" ref={ref}>
      <h1 className="text-xl">{props.wish.title}</h1>
      {props.wish.description.length > 0 && <p className="break-words">{props.wish.description}</p>}
      {props.wish.link.length > 0 && (
        <a className="link break-all" href={props.wish.link} rel="noreferrer" target="_blank">
          {props.wish.link}
        </a>
      )}
      {props.wish.reservedBy !== null ? (
        <ReservedBy
          reservedBy={props.wish.reservedBy}
          userId={props.userId}
          wishId={props.wish.id}
        />
      ) : (
        <ReserveWishButton userId={props.userId} wishId={props.wish.id} />
      )}
      {props.wish.comments.length > 0 && <Comments comments={props.wish.comments} />}
      <CommentInput userId={props.userId} wishId={props.wish.id} />
    </Modal>
  );
});
