"use client";

import cx from "classix";
import type { ReactNode } from "react";
import { forwardRef, useRef } from "react";
import { useCurrentUser } from "../../context/currentUser/hook";
import type { Wish } from "../../server/database/types/wishes";
import { mergeRefs } from "../../utils/refs";
import { useClientTranslations } from "../../utils/translations/client";
import Modal from "../Modal";
import ReserveWishButton from "../ReserveWishButton";
import UnreserveWishButton from "../UnreserveWishButton";
import CommentInput from "./CommentInput";
import Comments from "./Comments";
import Description from "./Description";
import Link from "./Link";
import Title from "./Title";

const bold = (chunks: ReactNode) => <span className="font-semibold">{chunks}</span>;

type Props = {
  userId: string;
  wish: Wish;
};

export default forwardRef<HTMLDialogElement, Props>(function WishModal(props, ref) {
  const t = useClientTranslations("client.WishModal");

  const innerRef = useRef<HTMLDialogElement>(null);
  const commentInputRef = useRef<{ reset: () => void }>(null);

  const currentUser = useCurrentUser();

  function closeModal() {
    innerRef.current?.close();
    setTimeout(function () {
      commentInputRef.current?.reset();
    }, 200);
  }

  return (
    <Modal
      className="flex flex-col items-center gap-4"
      close={closeModal}
      ref={mergeRefs(ref, innerRef)}
    >
      <Title title={props.wish.title} />
      <Description description={props.wish.description} />
      <Link link={props.wish.link} />
      {props.wish.reservedBy !== null ? (
        <>
          <p>
            {t.rich("reservedBy", {
              name: props.wish.reservedBy.name,
              you: props.wish.reservedBy.id === currentUser.id,
              bold,
            })}
          </p>
          {props.wish.reservedBy.id === currentUser.id && (
            <UnreserveWishButton userId={props.userId} wishId={props.wish.id} />
          )}
        </>
      ) : (
        <ReserveWishButton userId={props.userId} wishId={props.wish.id} />
      )}
      <div
        className={cx(
          "flex w-72 flex-col gap-2 rounded-2xl p-2 pt-0",
          props.wish.comments.length > 0 && "bg-base-300",
        )}
      >
        {props.wish.comments.length > 0 && <Comments comments={props.wish.comments} />}
        <CommentInput ref={commentInputRef} userId={props.userId} wishId={props.wish.id} />
      </div>
    </Modal>
  );
});
