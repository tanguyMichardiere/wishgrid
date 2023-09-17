"use client";

import cx from "classix";
import { useTranslations } from "next-intl";
import { forwardRef } from "react";
import { useCurrentUser } from "../../context/currentUser/hook";
import type { Wish } from "../../server/db/types/wishes";
import { formatTimestamp } from "../../utils/formatTimestamp";
import Avatar from "../Avatar";
import Modal from "../Modal";
import ReserveWishButton from "../ReserveWishButton";
import UnreserveWishButton from "../UnreserveWishButton";
import CommentInput from "./CommentInput";

type Props = {
  userId: string;
  wish: Wish;
};

export default forwardRef<HTMLDialogElement, Props>(function WishModal(props, ref) {
  const t = useTranslations("clientComponents.WishModal");

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
            {props.wish.reservedBy.id === currentUser.id && " (You)"}
          </p>
          {props.wish.reservedBy.id === currentUser.id && (
            <UnreserveWishButton userId={props.userId} wishId={props.wish.id} />
          )}
        </>
      ) : (
        <ReserveWishButton userId={props.userId} wishId={props.wish.id} />
      )}
      {props.wish.comments.length > 0 && (
        <ul className="w-72">
          {props.wish.comments.map((comment) => (
            <li
              className={cx("chat", comment.user.id === currentUser.id ? "chat-end" : "chat-start")}
              key={comment.id}
            >
              <Avatar className="chat-image" initialUser={comment.user} size="small" />
              <div className="chat-header">{comment.user.username}</div>
              <div className="chat-bubble break-words">{comment.text}</div>
              <div className="chat-footer opacity-50">{formatTimestamp(comment.timestamp)}</div>
            </li>
          ))}
        </ul>
      )}
      <CommentInput
        placeholder={t("commentInputPlaceholder")}
        userId={props.userId}
        wishId={props.wish.id}
      />
    </Modal>
  );
});
