"use client";

import { forwardRef } from "react";
import { useCurrentUser } from "../../context/currentUser/hook";
import type { Wish } from "../../server/db/types/wishes";
import { useClientTranslations } from "../../utils/translations/client";
import Modal from "../Modal";
import ReserveWishButton from "../ReserveWishButton";
import UnreserveWishButton from "../UnreserveWishButton";
import CommentInput from "./CommentInput";
import Comments from "./Comments";

type Props = {
  userId: string;
  wish: Wish;
};

export default forwardRef<HTMLDialogElement, Props>(function WishModal(props, ref) {
  const t = useClientTranslations("clientComponents.WishModal");

  const currentUser = useCurrentUser();

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
        <>
          <p>
            {t("reservedBy")}
            <span className="font-semibold">{props.wish.reservedBy.username}</span>
            {props.wish.reservedBy.id === currentUser.id && ` (${t("you")})`}
          </p>
          {props.wish.reservedBy.id === currentUser.id && (
            <UnreserveWishButton userId={props.userId} wishId={props.wish.id} />
          )}
        </>
      ) : (
        <ReserveWishButton userId={props.userId} wishId={props.wish.id} />
      )}
      {props.wish.comments.length > 0 && <Comments comments={props.wish.comments} />}
      <CommentInput
        placeholder={t("commentInputPlaceholder")}
        userId={props.userId}
        wishId={props.wish.id}
      />
    </Modal>
  );
});
